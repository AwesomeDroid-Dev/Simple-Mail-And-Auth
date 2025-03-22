import { getUserBySessionId } from "../DBtools/read.js";
import { editUser } from "../DBtools/write.js";
import { hashPassword, verifyPassword } from "../Encryption/encryption.js";

export default (req, res, sessionId) => {
  const { newPassword, password, input } = req.body;

  // If input is true, check the password
  if (input) {
    return getUserBySessionId(sessionId)
      .then((user) => {
        if (verifyPassword(password, user.hashedPassword)) {
          return res.status(200).json({ message: "Password is correct", ok: true });
        } else {
          return res.status(401).json({ message: "Password is incorrect", ok: false });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  }

  // If input is false, change the password
  if (!password) {
    return res.status(400).json({ message: "Current password is required" });
  }

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  getUserBySessionId(sessionId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!verifyPassword(password, user.hashedPassword)) {
        return res.status(401).json({ message: "Password is incorrect" });
      }

      const hashedPassword = hashPassword(newPassword);
      editUser(user.userId, {
        username: user.username,
        hashedPassword: hashedPassword,
      })
        .then(() => {
          return res
            .status(200)
            .json({ message: "Password changed successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
