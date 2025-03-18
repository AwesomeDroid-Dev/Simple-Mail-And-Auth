import { getMail, parseMail } from "../mail/mail.js";
import { verifySession } from "../Session/Session.js";

export default (req, res) => {
    verifySession(req)
    .then((result) => {
        if (!result) {
            return res.status(401).json({ message: "Failed to fetch sessionId" });
        }
        let mail = getMail(result);
        parseMail(mail)
        .then((parsedMail) => {
            return res.status(200).json(parsedMail);
        })
    })
};