import { readByUserId } from "../../DBtools/read.js";
import { getMailById } from "../../ApiTools/mail.js";

export default (req, res, session) => {
    getMailById(req.query.emailId)
    .then((mail) => {
        readByUserId(session.userId).then(user => {
            if (user.username === mail.to || user.username === mail.from) {
                return res.status(200).json(mail);
            }
            return res.status(401).json({ message: "Unauthorized" });
        })
    })
}