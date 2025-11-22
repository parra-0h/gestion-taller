import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import supabase from '@/lib/db';

interface Work {
    id: number;
    vehicle_id: number;
    description: string;
    assigned_bay: number;
    status: 'pending' | 'in_progress' | 'done';
    plate: string;
    model: string;
}

export default function MonitorBay() {
    const router = useRouter();
    const { bay } = router.query;
    const [work, setWork] = useState<Work | null>(null);

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
                .neq('status', 'done')
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
        }
    };

    useEffect(() => {
        fetchWork();
        const interval = setInterval(fetchWork, 5000);
        return () => clearInterval(interval);
    }, [bay]);

    const handleComplete = async () => {
        if (!work || !confirm('¿Marcar trabajo como terminado?')) return;
        try {
            // Update work status
            const { data, error } = await supabase
                .from('works')
                .update({ status: 'done' })
                .eq('id', work.id)
                .select()
                .single();

            if (error) throw error;

            if (data) {
                // Update vehicle status to completed
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
            <Head>
                <title>Pantalla {bay} - Taller Mecánico</title>
            </Head>

            {/* Header con número de pantalla */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 shadow-2xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-5xl font-bold tracking-wider">PANTALLA {bay}</h1>
                    <div className="text-right">
                        <div className="text-sm text-blue-200">Taller Mecánico</div>
                        <div className="text-xs text-blue-300">{new Date().toLocaleString('es-CL')}</div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex items-center justify-center p-8">
                {work ? (
                    <div className="w-full max-w-6xl">
                        {/* Información del vehículo */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-12 border-4 border-yellow-500">
                            {/* Patente destacada */}
                            <div className="text-center mb-8">
                                <div className="inline-block bg-yellow-400 text-gray-900 px-12 py-6 rounded-2xl shadow-xl transform -rotate-1">
                                    <div className="text-sm font-semibold mb-1">PATENTE</div>
                                    <div className="text-7xl font-black tracking-widest">{work.plate}</div>
                                </div>
                            </div>

                            {/* Modelo */}
                            <div className="text-center mb-12">
                                <div className="text-3xl text-gray-400 mb-2">Modelo</div>
                                <div className="text-5xl font-bold text-white">{work.model}</div>
                            </div>

                            {/* Descripción del trabajo */}
                            <div className="bg-gray-900 rounded-2xl p-8 mb-8 border-2 border-gray-700">
                                <h2 className="text-2xl font-semibold text-yellow-400 mb-4 uppercase tracking-wide">
                                    📋 Trabajo a Realizar
                                </h2>
                                <p className="text-3xl leading-relaxed whitespace-pre-wrap text-gray-100">
                                    {work.description}
                                </p>
                            </div>

                            {/* Estado */}
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className={`px-8 py-4 rounded-full text-2xl font-bold ${work.status === 'pending' ? 'bg-yellow-600' :
                                    work.status === 'in_progress' ? 'bg-blue-600' :
                                        'bg-green-600'
                                    }`}>
                                    {work.status === 'pending' ? '⏳ PENDIENTE' :
                                        work.status === 'in_progress' ? '🔧 EN PROGRESO' :
                                            '✅ COMPLETADO'}
                                </div>
                            </div>

                            {/* Botón de completar */}
                            <button
                                onClick={handleComplete}
                                className="w-full py-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-2xl text-4xl font-black transition-all transform hover:scale-105 shadow-2xl uppercase tracking-wider"
                            >
                                ✓ Marcar como Terminado
                            </button>
                        </div>
                    </div>
                ) : (
                    // Estado de espera
                    <div className="text-center">
                        <div className="mb-8 animate-pulse">
                            <div className="text-9xl mb-6">💤</div>
                            <div className="text-6xl font-bold text-gray-400 mb-4">
                                Esperando Vehículo...
                            </div>
                            <div className="text-3xl text-gray-500">
                                Pantalla {bay}
                            </div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-900 px-8 py-4 text-center text-gray-500 text-sm border-t border-gray-800">
                Actualización automática cada 5 segundos
            </div>
        </div>
    );
}
