import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Monitor, ExternalLink, AlertCircle, Loader } from 'lucide-react';
import supabase from '@/lib/db';

interface Work {
    id: number;
    vehicle_id: number;
    description: string;
    assigned_bay: number;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    plate: string;
    model: string;
}

const statusConfig = {
    pending: {
        label: 'Pendiente',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    in_progress: {
        label: 'En Progreso',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    completed: {
        label: 'Completado',
        color: 'bg-green-100 text-green-800 border-green-200',
    },
    cancelled: {
        label: 'Cancelado',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
    }
};

export default function Room3() {
    const [works, setWorks] = useState<Work[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorks = async () => {
        try {
            const { data, error } = await supabase
                .from('works')
                .select(`
                    *,
                    vehicles (
                        plate,
                        model
                    )
                `);

            if (error) throw error;

            const flattenedData = data?.map((work: any) => ({
                ...work,
                plate: work.vehicles?.plate,
                model: work.vehicles?.model,
                vehicles: undefined
            })) || [];

            setWorks(flattenedData);
        } catch (error) {
            console.error('Error fetching works:', error);
            setWorks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorks();
        const interval = setInterval(fetchWorks, 5000);
        return () => clearInterval(interval);
    }, []);

    const getBayWork = (bay: number) => works.find(w => w.assigned_bay === bay && w.status !== 'completed');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
            <Head>
                <title>Monitoreo en Tiempo Real | Sistema de Gestión</title>
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
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Monitor className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">Panel de Control de Monitores</h1>
                                    <p className="text-xs text-gray-600">Etapa 3 - Visualización en tiempo real</p>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                            ETAPA 3
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Instructions */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                    <div className="flex gap-4">
                        <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-purple-900 mb-2">Instrucciones de Uso</h3>
                            <ul className="space-y-1 text-sm text-purple-800">
                                <li>• Abra cada monitor en una pantalla o pestaña separada</li>
                                <li>• Presione <kbd className="px-2 py-1 bg-purple-200 rounded text-xs font-mono">F11</kbd> para modo pantalla completa</li>
                                <li>• Los monitores se actualizan automáticamente cada 5 segundos</li>
                                <li>• Cada estación muestra únicamente el trabajo asignado</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Monitor Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader className="w-8 h-8 text-purple-600 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(bay => {
                            const work = getBayWork(bay);
                            return (
                                <div key={bay} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    {/* Monitor Header */}
                                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Monitor className="w-6 h-6 text-white" />
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Estación {bay}</h3>
                                                    <p className="text-xs text-purple-200">Monitor de trabajo</p>
                                                </div>
                                            </div>
                                            <div className={`w-3 h-3 rounded-full ${work ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                                        </div>
                                    </div>

                                    {/* Monitor Content */}
                                    <div className="p-6">
                                        {work ? (
                                            <div className="space-y-4">
                                                {/* Vehicle Info */}
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-semibold text-gray-600 uppercase">Vehículo</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full border ${statusConfig[work.status].color}`}>
                                                            {statusConfig[work.status].label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-bold text-gray-900">{work.plate}</span>
                                                        <span className="text-gray-500">•</span>
                                                        <span className="text-sm text-gray-700">{work.model}</span>
                                                    </div>
                                                </div>

                                                {/* Work Description */}
                                                <div>
                                                    <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Trabajo Asignado</h4>
                                                    <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
                                                        {work.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <Monitor className="w-8 h-8 text-gray-500" />
                                                </div>
                                                <p className="text-gray-600 font-medium">Sin trabajo asignado</p>
                                                <p className="text-xs text-gray-500 mt-1">Estación disponible</p>
                                            </div>
                                        )}

                                        {/* Open Monitor Button */}
                                        <Link href={`/monitor/${bay}`}>
                                            <a
                                                target="_blank"
                                                className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span>Abrir Monitor {bay}</span>
                                            </a>
                                        </Link>
                                        <p className="text-xs text-center text-gray-600 mt-2">
                                            Se abrirá en una nueva pestaña
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* System Info */}
                <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Información del Sistema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Actualización Automática</p>
                                <p className="text-xs text-gray-600">Cada 5 segundos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Estaciones Activas</p>
                                <p className="text-xs text-gray-600">{works.filter(w => w.status !== 'completed').length} de 4</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Modo Pantalla Completa</p>
                                <p className="text-xs text-gray-600">Presione F11</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
