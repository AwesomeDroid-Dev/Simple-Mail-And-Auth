import { getMail, parseMail } from "../../ApiTools/mail.js";

export default (_req, res, session) => {
  getMail(session.userId).then((mail) => {
    parseMail(mail).then((parsedMail) => {
      return res.status(200).json(parsedMail);
    });
  });
};
