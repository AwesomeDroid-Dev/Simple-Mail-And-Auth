import { DB } from "../../../DBtools/db.js";
import { userIdToTag } from "../../ApiTools/account.js";

export default async (_req, res, session) => {
  const user = await DB.users.get(session.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    username: user.username,
    id: userIdToTag(user.id),
    password: "",
  });
};
