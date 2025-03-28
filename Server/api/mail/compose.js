import { insertMail } from "../../../DBtools/write.js";

export default (req, res, session) => {
  const { to, subject, body } = req.body;
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  insertMail(session.userId, to, subject, body);
  return res.status(200).json({ message: "Mail sent successfully!" });
};
