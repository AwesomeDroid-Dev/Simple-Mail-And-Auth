import { readByUserId } from "../../DBtools/read.js";
import { userIdToTag } from "../../ApiTools/account.js";

export default (_req, res, session) => {
  readByUserId(session.userId).then((user) => {
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
