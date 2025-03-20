import { getSessionBySessionId, getUserBySessionId } from "../DBtools/read.js";
import { getMailById } from "../mail/mail.js";

export default (req, res, sessionId) => {
    getMailById(req.query.emailId)
    .then((mail) => {
        getUserBySessionId(sessionId).then(user => {
            if (user.username === mail.to || user.username === mail.from) {
                return res.status(200).json(mail);
            }
            return res.status(401).json({ message: "Unauthorized" });
        })
        
    })
}