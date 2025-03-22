import { getUserBySessionId } from "../DBtools/read.js";
import { userIdToTag } from "../account/account.js";

export default (req, res, sessionId) => {
  getUserBySessionId(sessionId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      username: user.username,
      id: userIdToTag(user.userId),
      password: "",
    });
  });
};
