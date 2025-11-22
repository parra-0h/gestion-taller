import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Vehicle {
    id: number;
    plate: string;
    model: string;
    arrival_description: string;
    created_at: string;
}

export default function Room2() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [workDescription, setWorkDescription] = useState('');
    const [assignedBay, setAssignedBay] = useState(1);
    const [message, setMessage] = useState('');

    const fetchVehicles = async () => {
        try {
            const res = await fetch('/api/vehicles?status=arrived');
            if (!res.ok) {
                console.error('Failed to fetch vehicles:', res.status);
                setVehicles([]);
                return;
            }
            const data = await res.json();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setVehicles(data);
            } else {
                console.error('Invalid data format:', data);
                setVehicles([]);
            }
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            setVehicles([]);
        }
    };

    useEffect(() => {
        fetchVehicles();
        const interval = setInterval(fetchVehicles, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAssign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVehicle) return;

        try {
            const res = await fetch('/api/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: selectedVehicle.id,
                    description: workDescription,
                    assigned_bay: assignedBay,
                }),
            });

            if (res.ok) {
                setMessage('Trabajo asignado correctamente');
                setSelectedVehicle(null);
                setWorkDescription('');
                fetchVehicles();
            } else {
                setMessage('Error al asignar trabajo');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <Head><title>Sala 2: Recepción</title></Head>
            <Link href="/">
                <a className="text-blue-500 hover:underline mb-4 inline-block">&larr; Volver</a>
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Sala 2: Recepción y Asignación</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Vehículos en Espera</h2>
                    <div className="space-y-4">
                        {vehicles.map(v => (
                            <div
                                key={v.id}
                                className={`p-4 border rounded cursor-pointer transition ${selectedVehicle?.id === v.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}`}
                                onClick={() => setSelectedVehicle(v)}
                            >
                                <p className="font-bold text-gray-900 dark:text-white">{v.plate} - {v.model}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{v.arrival_description}</p>
                                <p className="text-xs text-gray-500 mt-2">{new Date(v.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                        {vehicles.length === 0 && <p className="text-gray-600 dark:text-gray-400">No hay vehículos esperando.</p>}
                    </div>
                </div>

                <div>
                    {selectedVehicle ? (
                        <form onSubmit={handleAssign} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Asignar Trabajo: {selectedVehicle.plate}</h3>
                            <div>
                                <label className="block mb-1 font-medium text-gray-900 dark:text-white">Descripción del Trabajo</label>
                                <textarea
                                    value={workDescription}
                                    onChange={e => setWorkDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-900 dark:text-white">Asignar a Pantalla (Bay)</label>
                                <select
                                    value={assignedBay}
                                    onChange={e => setAssignedBay(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    {[1, 2, 3, 4].map(n => (
                                        <option key={n} value={n}>Pantalla {n}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                                Asignar Trabajo
                            </button>
                            {message && <p className="text-center mt-2 font-medium text-gray-900 dark:text-white">{message}</p>}
                        </form>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border-dashed border-2">
                            Selecciona un vehículo para asignar trabajo
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
