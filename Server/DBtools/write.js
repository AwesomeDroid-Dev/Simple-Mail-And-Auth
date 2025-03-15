import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('blassera.db');

const generateUserID = () => {
    let min = 100000000000000000;
    let max = 999999999999999999;
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

const editUser = (userId, { username, password }) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET username = ?, password = ? WHERE userId = ?', username, password, userId, function(err) {
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

export {
    insertUser,
    editUser,
    removeUser
};
