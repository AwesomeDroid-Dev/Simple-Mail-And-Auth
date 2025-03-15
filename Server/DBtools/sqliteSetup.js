import { dirname } from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function setupDB() {
    if (process.env.NODE_ENV !== 'production' && process.env.DELETE_DB === 'true' && fs.existsSync(`${__dirname}/blassera.db`)) {
        console.log("Deleting blassera.db");
        try {
            fs.unlinkSync(`${__dirname}/blassera.db`);
            console.log("Database file deleted successfully.");
        } catch (err) {
            console.error("Error deleting database file:", err);
        }
    }

    const db = new sqlite3.Database(`${__dirname}/blassera.db`);

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY, username TEXT, hashedPassword TEXT)");
    });

    db.close();
}

