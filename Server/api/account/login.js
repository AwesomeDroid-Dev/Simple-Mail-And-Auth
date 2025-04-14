import { verifyPassword } from "../../Encryption/encryption.js";
import { createSessionId } from "../../ApiTools/Session.js";
import logger from "../../logger.js";
import { DB } from "../../../DBtools/db.js";

export default async (req, res) => {
  const { username, password } = req.body;
  logger.info(`User ${username} is attempting to log in`);
  try {
    const user = await DB.users.read('username', username);
    if (!user || !verifyPassword(password, user.hashedPassword)) {
      logger.info("Invalid credentials");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    logger.info("Login successful!");
    const sessionId = await createSessionId(user.id)
    res.cookie("sessionId", sessionId, { httpOnly: true, sameSite: "strict" });
    return res.status(200).json({ success: true, message: "Login successful!", sessionId: sessionId });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
