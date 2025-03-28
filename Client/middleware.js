import { deleteSession } from "../DBtools/write.js";
import { getSessionBySessionId } from "../DBtools/read.js";

export default (req, res, next) => {
  verifySession(req)
    .then((result) => {
      if (result === "Unauthorized") {
        return res.redirect("/login/");
      }
      return next();
    })
};

const getCookieValue = (req, key) => {
  if (!req.headers || !req.headers.cookie) {
    return undefined;
  }
  const value = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`))
    ?.split("=")[1];

  return value ? value : undefined;
};

const verifySession = (req) => {
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
        deleteSession(sessionId);
        return resolve("Unauthorized");
      }
      return resolve(session);
    });
  });
};
