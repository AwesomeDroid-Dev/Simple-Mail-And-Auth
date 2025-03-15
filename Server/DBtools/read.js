import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('blassera.db');

export const readByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const readByUserId = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE userId = ?', id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

