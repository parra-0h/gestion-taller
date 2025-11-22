import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // Assign work to a vehicle
        try {
            const { vehicle_id, description, assigned_bay } = req.body;

            // Start transaction
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // Create work
                const insertWork = `
          INSERT INTO works (vehicle_id, description, assigned_bay, status)
          VALUES ($1, $2, $3, 'pending')
          RETURNING *
        `;
                const workResult = await client.query(insertWork, [vehicle_id, description, assigned_bay]);

                // Update vehicle status
                const updateVehicle = `
          UPDATE vehicles SET status = 'working' WHERE id = $1
        `;
                await client.query(updateVehicle, [vehicle_id]);

                await client.query('COMMIT');
                res.status(201).json(workResult.rows[0]);
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'GET') {
        // Get works (optionally filter by bay)
        try {
            const { bay } = req.query;
            let query = `
        SELECT w.*, v.plate, v.model 
        FROM works w 
        JOIN vehicles v ON w.vehicle_id = v.id
      `;
            const params = [];

            if (bay) {
                query += ' WHERE w.assigned_bay = $1 AND w.status != \'done\'';
                params.push(bay);
            }

            const { rows } = await pool.query(query, params);
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'PUT') {
        // Update work status
        try {
            const { id, status } = req.body;
            const query = 'UPDATE works SET status = $1 WHERE id = $2 RETURNING *';
            const { rows } = await pool.query(query, [status, id]);

            if (status === 'done' && rows.length > 0) {
                // Optionally update vehicle status to completed if all works are done?
                // For simplicity, let's just mark the work as done.
                // Maybe update vehicle to 'completed'?
                const vehicleId = rows[0].vehicle_id;
                await pool.query("UPDATE vehicles SET status = 'completed' WHERE id = $1", [vehicleId]);
            }

            res.status(200).json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
