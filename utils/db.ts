import mysql, { Pool } from 'promise-mysql';

let pool: Pool;

export const init = async () => {
    pool = await mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })
};


export const query = async <T>(query: string): Promise<T> => {
    return pool.query(query);
};

export const closeConnection = async () => {
    await pool.end();
};
