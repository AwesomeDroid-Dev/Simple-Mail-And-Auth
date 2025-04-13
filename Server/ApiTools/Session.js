import { v4 as uuidv4 } from "uuid";
import { getSessionBySessionId } from "../../DBtools/read.js";
import { DB } from "../../DBtools/write.js";

export const createSessionId = (userId) => {
  const id = uuidv4(); // Generate a unique session ID
  DB.sessions.remove({userId: userId});
  const expirationDate = Date.now() + 60 * 60 * 1000; // 1 hour session
  return new Promise((resolve, reject) => {
    DB.sessions.insert([id, userId, expirationDate])
    .then(() => {
      resolve(id)
    })
    .catch((err) => {
      reject(err)
    })
  });
};

export const getCookieValue = (req, key) => {
  if (!req.headers || !req.headers.cookie) {
    return undefined;
  }
  const value = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`))
    ?.split("=")[1];

  return value ? value : undefined;
};

export const verifySession = (req) => {
  return new Promise((resolve, reject) => {
    const sessionId = getCookieValue(req, "sessionId");
    if (!sessionId) {
      return resolve("Unauthorized");
    }
    return getSessionBySessionId(sessionId).then((session) => {
      if (!session) {
        return resolve("Unauthorized");
      }
      if (session.expirationDate < Date.now()) {
        DB.sessions.remove({id: sessionId});
        return resolve("Unauthorized");
      }
      return resolve(session);
    });
  });
};

export const verifyUser = (req, res, func) => {
  verifySession(req)
    .then((result) => {
      if (result === "Unauthorized") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return func(req, res, result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err });
    });
};
