import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Monitor, Car, FileText, CheckCircle2, Clock, Loader } from 'lucide-react';
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

export default function MonitorBay() {
    const router = useRouter();
    const { bay } = router.query;
    const [work, setWork] = useState<Work | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWork = async () => {
        if (!bay) return;
        try {
            const { data, error } = await supabase
                .from('works')
                .select(`
                    *,
                    vehicles (
                        plate,
                        model
                    )
                `)
                .eq('assigned_bay', bay)
                .neq('status', 'completed')
                .limit(1);

            if (error) throw error;

            if (data && data.length > 0) {
                const workData = data[0] as any;
                setWork({
                    ...workData,
                    plate: workData.vehicles?.plate,
                    model: workData.vehicles?.model,
                });
            } else {
                setWork(null);
            }
        } catch (error) {
            console.error('Error fetching work:', error);
            setWork(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWork();
        const interval = setInterval(fetchWork, 5000);
        return () => clearInterval(interval);
    }, [bay]);

    const handleComplete = async () => {
        if (!work || !confirm('¿Confirmar que el trabajo ha sido completado?')) return;
        try {
            const { data, error } = await supabase
                .from('works')
                .update({ status: 'completed' })
                .eq('id', work.id)
                .select()
                .single();

            if (error) throw error;

            if (data) {
                const { error: vehicleError } = await supabase
                    .from('vehicles')
                    .update({ status: 'completed' })
                    .eq('id', data.vehicle_id);

                if (vehicleError) throw vehicleError;
            }

            fetchWork();
        } catch (error) {
            console.error('Error completing work:', error);
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'Pendiente',
                    color: 'bg-yellow-500',
                    icon: Clock
                };
            case 'in_progress':
                return {
                    label: 'En Progreso',
                    color: 'bg-blue-500',
                    icon: Loader
                };
            default:
                return {
                    label: 'Completado',
                    color: 'bg-green-500',
                    icon: CheckCircle2
                };
        }
    };

    const StatusIcon = work ? getStatusConfig(work.status).icon : Clock;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 flex flex-col">
            <Head>
                <title>Estación {bay} | Monitor de Trabajo</title>
            </Head>

            {/* Header */}
            <header className="bg-white border-b-4 border-purple-600 shadow-lg">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-600 p-3 rounded-lg shadow-md">
                                <Monitor className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-wide text-gray-900">ESTACIÓN {bay}</h1>
                                <p className="text-sm text-gray-600 mt-1">Monitor de Trabajo en Tiempo Real</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-semibold">Sistema Activo</span>
                            </div>
                            <div className="text-xs text-gray-600">
                                {new Date().toLocaleString('es-CL', {
                                    dateStyle: 'short',
                                    timeStyle: 'medium'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-8">
                {isLoading ? (
                    <div className="text-center">
                        <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-700 text-lg font-semibold">Cargando información...</p>
                    </div>
                ) : work ? (
                    <div className="w-full max-w-6xl">
                        <div className="bg-white rounded-2xl border-4 border-purple-200 shadow-2xl overflow-hidden">
                            {/* Vehicle Plate - Destacado */}
                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-12 py-8 border-b-4 border-purple-300">
                                <div className="text-center">
                                    <div className="inline-block bg-yellow-400 px-16 py-8 rounded-xl shadow-2xl transform -rotate-1 border-4 border-gray-900">
                                        <div className="text-sm font-bold text-gray-900 mb-2 tracking-wider">PATENTE</div>
                                        <div className="text-7xl font-black text-gray-900 tracking-widest">
                                            {work.plate}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Info */}
                            <div className="px-12 py-8 border-b-2 border-gray-200 bg-gray-50">
                                <div className="flex items-center gap-4 mb-6">
                                    <Car className="w-8 h-8 text-purple-600" />
                                    <div>
                                        <div className="text-sm text-gray-600 uppercase tracking-wide mb-1 font-semibold">Modelo del Vehículo</div>
                                        <div className="text-4xl font-bold text-gray-900">{work.model}</div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-700 uppercase tracking-wide font-semibold">Estado:</div>
                                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getStatusConfig(work.status).color} shadow-md`}>
                                        <StatusIcon className="w-5 h-5 text-white" />
                                        <span className="text-white font-bold text-lg">{getStatusConfig(work.status).label}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Work Description */}
                            <div className="px-12 py-8 bg-white">
                                <div className="flex items-start gap-4 mb-4">
                                    <FileText className="w-7 h-7 text-purple-600 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-purple-600 uppercase tracking-wide mb-4">
                                            Trabajo Asignado
                                        </h2>
                                        <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6">
                                            <p className="text-2xl leading-relaxed text-gray-900 whitespace-pre-wrap font-medium">
                                                {work.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-12 py-8 bg-gray-50">
                                <button
                                    onClick={handleComplete}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-6 px-8 rounded-xl text-2xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                                >
                                    <CheckCircle2 className="w-8 h-8" />
                                    <span>Marcar como Completado</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Waiting State
                    <div className="text-center">
                        <div className="bg-white rounded-2xl border-4 border-gray-300 px-16 py-20 shadow-2xl">
                            <div className="mb-8">
                                <div className="inline-block bg-gray-200 p-8 rounded-full mb-6">
                                    <Monitor className="w-24 h-24 text-gray-500" />
                                </div>
                                <h2 className="text-5xl font-bold text-gray-700 mb-4">
                                    Esperando Asignación
                                </h2>
                                <p className="text-2xl text-gray-600">
                                    Estación {bay} disponible
                                </p>
                            </div>
                            <div className="flex justify-center gap-3">
                                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t-2 border-gray-300 px-8 py-4 shadow-inner">
                <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold">Actualización automática cada 5 segundos</span>
                    </div>
                    <div className="font-semibold">Sistema de Gestión de Taller v1.0</div>
                </div>
            </footer>
        </div>
    );
}
