import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Car, FileText, Save, CheckCircle, AlertCircle } from 'lucide-react';
import supabase from '@/lib/db';

export default function Room1() {
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const { data, error } = await supabase
                .from('vehicles')
                .insert([{
                    plate,
                    model,
                    arrival_description: description,
                    status: 'arrived'
                }])
                .select()
                .single();

            if (error) throw error;

            setMessage('Vehículo registrado correctamente');
            setIsSuccess(true);
            setPlate('');
            setModel('');
            setDescription('');

            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error registering vehicle:', error);
            setMessage('Error al registrar vehículo. Por favor, intente nuevamente.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <Head>
                <title>Recepción de Vehículos | Sistema de Gestión</title>
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
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Car className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">Recepción de Vehículos</h1>
                                    <p className="text-xs text-gray-600">Etapa 1 - Registro inicial</p>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                            ETAPA 1
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <div className="flex gap-3">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">Instrucciones</h3>
                            <p className="text-sm text-blue-800">
                                Complete el formulario con la información del vehículo que ingresa al taller.
                                Incluya una descripción detallada del problema reportado por el cliente.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-bold text-gray-900">Registro de Vehículo</h2>
                        <p className="text-sm text-gray-600 mt-1">Ingrese los datos del vehículo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Patente del Vehículo
                            </label>
                            <input
                                type="text"
                                value={plate}
                                onChange={e => setPlate(e.target.value.toUpperCase())}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 font-medium bg-white"
                                placeholder="Ej: ABC123"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Modelo del Vehículo
                            </label>
                            <input
                                type="text"
                                value={model}
                                onChange={e => setModel(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                                placeholder="Ej: Toyota Corolla 2020"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Descripción del Problema
                            </label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 resize-none bg-white"
                                rows={5}
                                placeholder="Describa detalladamente el problema reportado por el cliente..."
                                required
                            />
                            <p className="text-xs text-gray-600 mt-2">
                                Sea lo más específico posible para facilitar el diagnóstico
                            </p>
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
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Registrando...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Registrar Vehículo</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
