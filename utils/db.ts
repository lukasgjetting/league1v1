import mysql, { escape, Pool } from 'promise-mysql';
import { User, UserToken } from './types';

let pool: mysql.Pool;

let isInitialized = false;

export const init = async () => {
    if (isInitialized) {
        return;
    }
    
    isInitialized = true;

    pool = await mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })
};

export const query = async <T>(query: string): Promise<T> => {
    await init();
    console.log('QUERY', query);
    return pool.query(query);
};

export const closeConnection = async () => {
    await pool.end();
};

/* ================================= */
/* Below are domain specific methods */
/* ================================= */

export const getUserBySummonerName = async (summonerName: string): Promise<User> => {
    const result = await query(`
        SELECT *
        FROM users
        WHERE summonerName = ${escape(summonerName)}
    `) as User[];
        
    return result[0];
};

export const getUserByToken = async (token: string): Promise<User> => {
    const result = await query(`
        SELECT u.*
        FROM users u
        JOIN user_tokens t
            ON u.id = t.userId
        WHERE token = ${escape(token)}
    `) as User[];
        
    return result[0];
};
    
export const getUserTokenByToken = async (token: string): Promise<UserToken> => {
    const result = await query(`
        SELECT *
        FROM user_tokens
        WHERE token = ${escape(token)}
    `) as UserToken[];

    return result[0];
}