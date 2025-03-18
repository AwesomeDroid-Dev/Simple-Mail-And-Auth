import { readByUserId } from "../DBtools/read.js";
import { verifySession } from "../Session/Session.js";
import { getSessionBySessionId } from "../DBtools/read.js";

export default (req, res) => {
  let sessionId;
  verifySession(req)
  .then((result) => {
    sessionId = result;
    if (!result) {
      return res.status(401).json({ message: "Failed to fetch sessionId" });
    }
    return getSessionBySessionId(sessionId).then((session) => {
      return readByUserId(session.userId).then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ name: user.username, expirationDate: session.expirationDate });
      });
    });
  });
};
