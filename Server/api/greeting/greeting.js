import { DB } from "../../../DBtools/db.js";

export default async (_req, res, session) => {
  try {
    let user = await DB.users.get(session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ name: user.username, expirationDate: session.expirationDate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
