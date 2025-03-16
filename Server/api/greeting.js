import { readByUserId } from "../DBtools/read.js";
import { getUserIdBySessionId } from "../Session/Session.js";
import { getCookieValue } from "../Session/Session.js";

export default (req, res) => {
  const sessionId = getCookieValue(req, "sessionId");
  if (!sessionId) {
    return res.status(401).json({ message: "Failed to fetch" });
  }

  getUserIdBySessionId(sessionId)
    .then((userId) => {
      if (!userId) {
        return res.status(401).json({ message: "Failed to fetch" });
      }
      return userId;
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }))
    .then((userId) => {
      if (!userId) {
        return res.status(401).json({ message: "Failed to fetch" });
      }
      readByUserId(userId)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "Cookie Expired" });
          }
          res.status(200).json({ name: user.username });
        })
        .catch((err) =>
          res.status(500).json({ message: "Internal Server Error" })
        );
    });
};