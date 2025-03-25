import { readByUsername } from "../../DBtools/read.js";
import { insertMail } from "../../DBtools/write.js";

export default (req, res, session) => {
  const { to, subject, body } = req.body;
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  readByUsername(to).then((user) => { //This part makes it so that mail is sent by name
    if (!user) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    insertMail(session.userId, user.userId, subject, body);
    return res.status(200).json({ message: "Mail sent successfully!" });
  });
};
