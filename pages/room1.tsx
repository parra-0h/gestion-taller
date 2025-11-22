import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import supabase from '@/lib/db';

export default function Room1() {
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            setPlate('');
            setModel('');
            setDescription('');
        } catch (error) {
            console.error('Error registering vehicle:', error);
            setMessage('Error al registrar vehículo');
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <Link href="/">
                    <a className="text-blue-500 hover:underline mb-4 inline-block">&larr; Volver</a>
                </Link>
                <Head><title>Sala 1: Llegada</title></Head>
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Sala 1: Llegada de Vehículos</h1>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-white">Patente</label>
                        <input
                            type="text"
                            value={plate}
                            onChange={e => setPlate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-white">Modelo</label>
                        <input
                            type="text"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-white">Descripción de Llegada</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Registrar Vehículo
                    </button>
                    {message && <p className="text-center mt-2 font-medium text-gray-900 dark:text-white">{message}</p>}
                </form>
            </div>
        </div>
    );
}
