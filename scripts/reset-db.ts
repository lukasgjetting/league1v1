import 'dotenv/config';
import {closeConnection, query} from '../utils/db';

(async () => {
    try {
        await query('DROP TABLE IF EXISTS users;');
        await query('DROP TABLE IF EXISTS user_tokens;');
        await query('DROP TABLE IF EXISTS matches;');

        await query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT,
                summonerName VARCHAR(255) NOT NULL,
                leaguePuuid VARCHAR(255) NULL,
                verified TINYINT(1) NOT NULL DEFAULT 0,
                createdAt DATETIME NULL DEFAULT NOW(),
                PRIMARY KEY (id)
            );
        `);

        await query(`
            CREATE TABLE matches (
                id INT NOT NULL AUTO_INCREMENT,
                user1Id INT NOT NULL,
                user2Id INT NOT NULL,
                user1ChampionId VARCHAR(255) NOT NULL,
                user2ChampionId VARCHAR(255) NOT NULL,
                result TINYINT(1) NULL,
                resultReason VARCHAR(255) NULL,
                endedAt DATETIME NOT NULL,
                startedAt DATETIME NOT NULL,
                PRIMARY KEY (id)
            );
        `);

        await query(`
            CREATE TABLE user_tokens (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                runePageName VARCHAR(255) NOT NULL,
                token VARCHAR(255) NOT NULL,
                active TINYINT(1) NOT NULL DEFAULT 0,
                lastUsed DATETIME NOT NULL DEFAULT NOW(),
                createdAt DATETIME NOT NULL DEFAULT NOW(),
                PRIMARY KEY (id)
            );
        `);

        console.log('Done resetting database');
    } catch (e) {
        console.error(e);
    } finally {
        await closeConnection();
    }
})();