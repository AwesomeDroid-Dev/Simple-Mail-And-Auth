import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('blassera.db');

const generateUserID = () => {
    let min = 1000000000;
    let max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateSessionID = () => {
    let min = 100000000000000000;
    let max = 999999999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateMailID = () => {
    let min = 1000000000;
    let max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const insertUser = ({ username, password }) => {
    const userId = generateUserID();
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (userId, username, hashedPassword) VALUES (?,?,?)', userId, username, password, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(userId);
            }
        });
    });
};

const editUser = (userId, { username, hashedPassword }) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET username = ?, hashedPassword = ? WHERE userId = ?', username, hashedPassword, userId, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

const removeUser = userId => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE userId = ?', userId, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

const insertSession = (sessionId, userId, expirationDate) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO sessions (sessionId, userId, expirationDate) VALUES (?,?,?)', sessionId, userId, expirationDate, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

const deleteSession = sessionId => {
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

const insertMail = (fromId, toId, subject, body) => {
    return new Promise((resolve, reject) => {
        const emailId = generateMailID();
        fromId = Number(fromId);
        toId = Number(toId);
        db.run('INSERT INTO mail (emailId, fromId, toId, subject, body) VALUES (?,?,?,?,?)', emailId, fromId, toId, subject, body, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export {
    insertUser,
    editUser,
    removeUser,
    insertSession,
    deleteSession,
    insertMail
};
