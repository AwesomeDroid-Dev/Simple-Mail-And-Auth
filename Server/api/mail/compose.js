import { DB } from "../../../DBtools/db.js";

export default (req, res, session) => {
  const { to, subject, body } = req.body;
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  const id = generateMailID();
  DB.mail.insert([id, session.userId, to, subject, body]);
  return res.status(200).json({ message: "Mail sent successfully!" });
};

function generateMailID() {
  let min = 1000000000;
  let max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};