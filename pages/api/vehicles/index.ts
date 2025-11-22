import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { status } = req.query;
            let query = supabase
                .from('vehicles')
                .select('*')
                .order('created_at', { ascending: false });

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query;

            if (error) throw error;
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { plate, model, arrival_description } = req.body;
            const { data, error } = await supabase
                .from('vehicles')
                .insert([{
                    plate,
                    model,
                    arrival_description,
                    status: 'arrived'
                }])
                .select()
                .single();

            if (error) throw error;
            res.status(201).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
