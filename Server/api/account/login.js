import { readByUsername } from "../../../DBtools/read.js";
import { verifyPassword } from "../../Encryption/encryption.js";
import { createSessionId } from "../../ApiTools/Session.js";

export default async (req, res) => {
  const { username, password } = req.body;
  console.log(`User ${username} is attempting to log in`);
  try {
    const user = await readByUsername(username);
    if (!user || !verifyPassword(password, user.hashedPassword)) {
      console.log("Invalid credentials");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    console.log("Login successful!");
    const sessionId = await createSessionId(user.userId)
    res.cookie("sessionId", sessionId, { httpOnly: true, sameSite: "strict" });
    return res.status(200).json({ success: true, message: "Login successful!", sessionId: sessionId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
