import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // Assign work to a vehicle
        try {
            const { vehicle_id, description, assigned_bay } = req.body;

            // Create work
            const { data: workData, error: workError } = await supabase
                .from('works')
                .insert([{
                    vehicle_id,
                    description,
                    assigned_bay,
                    status: 'pending'
                }])
                .select()
                .single();

            if (workError) throw workError;

            // Update vehicle status
            const { error: vehicleError } = await supabase
                .from('vehicles')
                .update({ status: 'working' })
                .eq('id', vehicle_id);

            if (vehicleError) throw vehicleError;

            res.status(201).json(workData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'GET') {
        // Get works (optionally filter by bay)
        try {
            const { bay } = req.query;
            let query = supabase
                .from('works')
                .select(`
                    *,
                    vehicles (
                        plate,
                        model
                    )
                `);

            if (bay) {
                query = query
                    .eq('assigned_bay', bay)
                    .neq('status', 'done');
            }

            const { data, error } = await query;

            if (error) throw error;

            // Flatten the response to match the original structure
            const flattenedData = data?.map(work => ({
                ...work,
                plate: work.vehicles?.plate,
                model: work.vehicles?.model,
                vehicles: undefined
            }));

            res.status(200).json(flattenedData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'PUT') {
        // Update work status
        try {
            const { id, status } = req.body;
            const { data, error } = await supabase
                .from('works')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            if (status === 'done' && data) {
                // Update vehicle status to completed
                const { error: vehicleError } = await supabase
                    .from('vehicles')
                    .update({ status: 'completed' })
                    .eq('id', data.vehicle_id);

                if (vehicleError) throw vehicleError;
            }

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
