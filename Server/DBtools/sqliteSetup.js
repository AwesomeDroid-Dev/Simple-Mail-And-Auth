import sqlite3 from 'sqlite3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default function setupDB() {
    if (process.env.NODE_ENV !== 'production' && process.env.DELETE_DB === 'true' && fs.existsSync('blassera.db')) {
        console.log("Deleting blassera.db");
        try {
            fs.unlinkSync('blassera.db');
            console.log("Database file deleted successfully.");
        } catch (err) {
            console.error("Error deleting database file:", err);
        }
    }

    const db = new sqlite3.Database('blassera.db');

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY, username TEXT, hashedPassword TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY, userId INTEGER, expirationDate INTEGER, FOREIGN KEY(userId) REFERENCES users(userId))");
    });

    db.close();
}

