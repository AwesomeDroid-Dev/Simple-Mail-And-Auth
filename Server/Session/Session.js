import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";
import { getSessionBySessionId } from "../DBtools/read.js";
import { deleteSession } from "../DBtools/write.js";

const db = new sqlite3.Database("blassera.db");

export const createSessionId = (userId) => {
  const sessionId = uuidv4(); // Generate a unique session ID
  db.run("DELETE FROM sessions WHERE userId = ?", userId);
  const expirationDate = Date.now() + 15 * 60 * 1000; // 5 seconds in the future
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO sessions (sessionId, userId, expirationDate) VALUES (?, ?, ?)",
      sessionId,
      userId,
      expirationDate,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(sessionId);
        }
      }
    );
  });
};

export const getCookieValue = (req, key) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const value = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`))
    ?.split("=")[1];

  return value ? value : undefined;
};

export const verifySession = (req) => {
  const sessionId = getCookieValue(req, "sessionId");
  if (!sessionId) {
    return false;
  }
  return getSessionBySessionId(sessionId).then((session) => {
    if (!session) {
      return undefined;
    }
    if (session.expirationDate < Date.now()) {
      deleteSession(sessionId);
      return false;
    }
    return sessionId;
  });
};