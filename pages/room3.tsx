import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Work {
    id: number;
    vehicle_id: number;
    description: string;
    assigned_bay: number;
    status: 'pending' | 'in_progress' | 'done';
    plate: string;
    model: string;
}

export default function Room3() {
    const [works, setWorks] = useState<Work[]>([]);

    const fetchWorks = async () => {
        try {
            const res = await fetch('/api/works');
            if (!res.ok) {
                console.error('Failed to fetch works:', res.status);
                setWorks([]);
                return;
            }
            const data = await res.json();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setWorks(data);
            } else {
                console.error('Invalid data format:', data);
                setWorks([]);
            }
        } catch (error) {
            console.error('Error fetching works:', error);
            setWorks([]);
        }
    };

    useEffect(() => {
        fetchWorks();
        const interval = setInterval(fetchWorks, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleComplete = async (id: number) => {
        if (!confirm('¿Marcar trabajo como terminado?')) return;
        try {
            await fetch('/api/works', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: 'done' }),
            });
            fetchWorks();
        } catch (error) {
            console.error(error);
        }
    };

    const getBayWork = (bay: number) => works.find(w => w.assigned_bay === bay && w.status !== 'done');

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <Head><title>Sala 3: Monitores</title></Head>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sala 3: Panel de Control de Monitores</h1>
                    <Link href="/">
                        <a className="text-blue-500 hover:underline">Volver al Inicio</a>
                    </Link>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-6 mb-8 rounded">
                    <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        📺 Instrucciones para Monitores
                    </h2>
                    <p className="text-blue-800 dark:text-blue-200 mb-2">
                        Abre cada enlace en un monitor diferente y presiona <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-sm font-mono">F11</kbd> para pantalla completa.
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Cada monitor mostrará solo el trabajo asignado a su pantalla en tamaño grande.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(bay => {
                        const work = works.find(w => w.assigned_bay === bay && w.status !== 'done');
                        return (
                            <div key={bay} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                                    <h3 className="text-2xl font-bold text-white">PANTALLA {bay}</h3>
                                </div>

                                <div className="p-6">
                                    {work ? (
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-3xl">🚗</span>
                                                <div>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{work.plate}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{work.model}</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mt-3">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{work.description}</p>
                                            </div>
                                            <div className="mt-3">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${work.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                                        work.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                                                            'bg-green-200 text-green-800'
                                                    }`}>
                                                    {work.status === 'pending' ? 'Pendiente' :
                                                        work.status === 'in_progress' ? 'En Progreso' :
                                                            'Completado'}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <p className="text-4xl mb-2">💤</p>
                                            <p className="text-sm">Sin trabajo asignado</p>
                                        </div>
                                    )}

                                    <Link href={`/monitor/${bay}`}>
                                        <a
                                            target="_blank"
                                            className="block w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-center rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            🖥️ Abrir Monitor {bay}
                                        </a>
                                    </Link>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                                        Se abrirá en una nueva pestaña
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💡 Consejos</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Cada monitor se actualiza automáticamente cada 5 segundos</li>
                        <li>• Usa <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">F11</kbd> para pantalla completa</li>
                        <li>• Los mecánicos pueden marcar trabajos como terminados desde su monitor</li>
                        <li>• Abre cada enlace en un monitor físico diferente para mejor visualización</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
