import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ClipboardList, Car, FileText, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import supabase from '@/lib/db';

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
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchVehicles = async () => {
        try {
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .eq('status', 'arrived')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setVehicles(data || []);
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

        setIsLoading(true);
        setMessage('');

        try {
            // Create work
            const { data: workData, error: workError } = await supabase
                .from('works')
                .insert([{
                    vehicle_id: selectedVehicle.id,
                    description: workDescription,
                    assigned_bay: assignedBay,
                    status: 'pending'
                }])
                .select()
                .single();

            if (workError) throw workError;

            // Update vehicle status
            const { error: vehicleError } = await supabase
                .from('vehicles')
                .update({ status: 'in_progress' })
                .eq('id', selectedVehicle.id);

            if (vehicleError) throw vehicleError;

            setMessage('Trabajo asignado correctamente');
            setIsSuccess(true);
            setSelectedVehicle(null);
            setWorkDescription('');
            fetchVehicles();

            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error assigning work:', error);
            setMessage('Error al asignar trabajo. Por favor, intente nuevamente.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100">
            <Head>
                <title>Asignación de Trabajos | Sistema de Gestión</title>
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <a className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Volver</span>
                                </a>
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-3">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <ClipboardList className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">Asignación de Trabajos</h1>
                                    <p className="text-xs text-gray-600">Etapa 2 - Distribución de tareas</p>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            ETAPA 2
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Vehicle List */}
                    <div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Vehículos en Espera</h2>
                                        <p className="text-sm text-gray-600 mt-1">Seleccione un vehículo para asignar trabajo</p>
                                    </div>
                                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                                        <span className="text-sm font-bold text-gray-800">{vehicles.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {vehicles.length > 0 ? (
                                    <div className="space-y-3">
                                        {vehicles.map(v => (
                                            <div
                                                key={v.id}
                                                onClick={() => setSelectedVehicle(v)}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedVehicle?.id === v.id
                                                        ? 'border-green-500 bg-green-50 shadow-md'
                                                        : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded-lg ${selectedVehicle?.id === v.id ? 'bg-green-600' : 'bg-gray-100'
                                                        }`}>
                                                        <Car className={`w-5 h-5 ${selectedVehicle?.id === v.id ? 'text-white' : 'text-gray-700'
                                                            }`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-gray-900">{v.plate}</h3>
                                                            <span className="text-gray-500">•</span>
                                                            <span className="text-sm text-gray-700">{v.model}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                                                            {v.arrival_description}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{new Date(v.created_at).toLocaleString('es-CL')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Car className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <p className="text-gray-600 font-medium">No hay vehículos en espera</p>
                                        <p className="text-sm text-gray-500 mt-1">Los vehículos registrados aparecerán aquí</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Assignment Form */}
                    <div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-8">
                            {selectedVehicle ? (
                                <>
                                    <div className="border-b border-gray-200 px-6 py-4 bg-green-50">
                                        <h3 className="text-lg font-bold text-gray-900">Asignar Trabajo</h3>
                                        <p className="text-sm text-green-800 mt-1">
                                            Vehículo: <span className="font-semibold">{selectedVehicle.plate}</span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleAssign} className="p-6 space-y-6">
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                            <h4 className="text-sm font-semibold text-gray-800 mb-2">Problema Reportado</h4>
                                            <p className="text-sm text-gray-700">{selectedVehicle.arrival_description}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                                Descripción del Trabajo a Realizar
                                            </label>
                                            <textarea
                                                value={workDescription}
                                                onChange={e => setWorkDescription(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 resize-none bg-white"
                                                rows={5}
                                                placeholder="Describa las tareas específicas que se realizarán..."
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                                Estación de Trabajo
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {[1, 2, 3, 4].map(n => (
                                                    <button
                                                        key={n}
                                                        type="button"
                                                        onClick={() => setAssignedBay(n)}
                                                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${assignedBay === n
                                                                ? 'bg-green-600 text-white shadow-md'
                                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {n}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {message && (
                                            <div className={`flex items-center gap-3 p-4 rounded-lg ${isSuccess
                                                    ? 'bg-green-50 border border-green-200'
                                                    : 'bg-red-50 border border-red-200'
                                                }`}>
                                                {isSuccess ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                ) : (
                                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                )}
                                                <p className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'
                                                    }`}>
                                                    {message}
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Asignando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    <span>Asignar Trabajo</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-gray-500" />
                                    </div>
                                    <p className="text-gray-600 font-medium">Seleccione un vehículo</p>
                                    <p className="text-sm text-gray-500 mt-1">Elija un vehículo de la lista para asignar trabajo</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
