import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { status } = req.query;
            let query = 'SELECT * FROM vehicles';
            const params = [];

            if (status) {
                query += ' WHERE status = $1';
                params.push(status);
            }

            query += ' ORDER BY created_at DESC';

            const { rows } = await pool.query(query, params);
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { plate, model, arrival_description } = req.body;
            const query = `
        INSERT INTO vehicles (plate, model, arrival_description, status)
        VALUES ($1, $2, $3, 'arrived')
        RETURNING *
      `;
            const { rows } = await pool.query(query, [plate, model, arrival_description]);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
