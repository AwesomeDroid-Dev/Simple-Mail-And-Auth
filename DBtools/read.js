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

export const getSessionByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM sessions WHERE userId = ?', userId, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const getSessionBySessionId = (sessionId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM sessions WHERE sessionId = ?', sessionId, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const getMailByEmailId = (emailId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM mail WHERE emailId = ?', emailId, (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        reject('Mail not found');
      } else {
        resolve(row);
      }
    });
  });
};

//get mail of user
export const getMailFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM mail WHERE fromId = ?', userId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getMailToUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM mail WHERE toId = ?', userId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getUserBySessionId = (sessionId) => {
  return new Promise((resolve, reject) => {
    getSessionBySessionId(sessionId)
    .then((sessionId) => {
      readByUserId(sessionId.userId)
      .then(user => {
        if (!user) {
          reject('User not found')
        }
        resolve(user)
      })
      .catch( err =>
        reject(err)
      )
    })
  })
}