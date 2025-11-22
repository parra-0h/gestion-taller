import { Pool } from 'pg';

const pool = new Pool({
    user: 'taller_user',
    host: 'localhost',
    database: 'taller_mecanico',
    password: 'password',
    port: 5432,
});

export default pool;
