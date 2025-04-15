import { DB } from "../../../DBtools/db.js";
import { verifyPassword } from "../../Encryption/encryption.js";
import logger from "../../logger.js";

export default async (req, res, session) => {
  logger.info(`User ${session.userId} is attempting to check password`);
  try {
    const { password } = req.body;
    const user = await DB.users.get(session.userId);
    if (!user) {
      logger.info("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    if (verifyPassword(password, user.hashedPassword)) {
      logger.info("Password is correct");
      return res.status(200).json({ ok: true, message: "Password is correct" });
    }
    logger.info("Password is incorrect");
    return res.status(401).json({ ok: false, message: "Password is incorrect" });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
