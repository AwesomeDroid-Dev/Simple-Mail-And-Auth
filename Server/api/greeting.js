import { readByUserId } from "../DBtools/read.js";
import { getSessionBySessionId } from "../DBtools/read.js";

export default (_req, res, sessionId) => {
  return getSessionBySessionId(sessionId).then((session) => {
    return readByUserId(session.userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ name: user.username, expirationDate: session.expirationDate });
    });
  });
};
