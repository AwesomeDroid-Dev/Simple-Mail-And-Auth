import { v4 as uuidv4 } from 'uuid';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('blassera.db');

export const createSessionId = (userId) => {
    const sessionId = uuidv4(); // Generate a unique session ID
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO sessions (sessionId, userId) VALUES (?, ?)', sessionId, userId, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(sessionId);
            }
        });
    });
};

export const getUserIdBySessionId = (sessionId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT userId FROM sessions WHERE sessionId = ?', sessionId, function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.userId : null);
            }
        });
    });
};

export const deleteSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM sessions WHERE sessionId = ?', sessionId, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export const getCookieValue = (req, key) => {
    const value = req.headers.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${key}=`))
      ?.split("=")[1];
  
    return value ? value : undefined;
  };  