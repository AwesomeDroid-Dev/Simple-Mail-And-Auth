import { getMail, parseMail } from "../mail/mail.js";
import { getSessionBySessionId } from "../DBtools/read.js";

export default (req, res, sessionId) => {
  getSessionBySessionId(sessionId).then((session) => {
    getMail(session.userId).then((mail) => {
      parseMail(mail).then((parsedMail) => {
        return res.status(200).json(parsedMail);
      });
    });
  });
};
