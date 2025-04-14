import sqlite3 from 'sqlite3';

const dbObject = new sqlite3.Database('blassera.db');

class DBtable {
    constructor(name, values) {
        this.name = name;
        this.values = values; //ex. ["userId", "username", "hashedPassword"]
    }

    insert(values) {
        //ex. [2003984303, "killer", okmsdklkfiosnpvmIOjOI0q90fj]
        return new Promise((resolve, reject) => {
            dbObject.run(`INSERT INTO ${this.name} (${this.values.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    update(id, values) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(values);
            const placeholders = keys.map((key) => `${key} = ?`).join(', ');
            const idName = Object.keys(id)[0];
            const sql = `UPDATE ${this.name} SET ${placeholders} WHERE ${idName} = ?`;

            const params = [...keys.map((key) => values[key]), id[idName]];

            dbObject.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    remove(variable, value) {
        return new Promise((resolve, reject) => {
            if (!this.values.includes(variable)) reject('Variable not found');
            dbObject.run(`DELETE FROM ${this.name} WHERE ${variable} = ?`, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    read(variable, value) {
        return new Promise((resolve, reject) => {
            if (!this.values.includes(variable)) reject('Variable not found');
            dbObject.get(`SELECT * FROM ${this.name} WHERE ${variable} = ?`, value, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    readAll(variable, value) {
        return new Promise((resolve, reject) => {
            if (!this.values.includes(variable)) reject('Variable not found');
            dbObject.all(`SELECT * FROM ${this.name} WHERE ${variable} = ?`, value, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            dbObject.get(`SELECT * FROM ${this.name} WHERE id = ?`, id, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

export const DB = {
    users: new DBtable('users', ['id', 'username', 'hashedPassword']),
    sessions: new DBtable('sessions', ['id', 'userId', 'expirationDate']),
    mail: new DBtable('mail', ['id', 'fromId', 'toId', 'subject', 'body'])
};
