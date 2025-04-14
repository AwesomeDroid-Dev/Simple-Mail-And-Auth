import { DB } from "../../DBtools/db.js";
import { userIdToTag } from "../ApiTools/account.js";

export const getMail = (userId) => {
  return DB.mail.readAll("toId", Number(userId));
};

export const getMailById = async (emailId) => {
  try {
    const mail = await DB.mail.get(Number(emailId));
    const from = await DB.users.get(mail.fromId);
    const to = await DB.users.get(mail.toId);

    return {
      id: mail.emailId,
      from: `${from.username} #${userIdToTag(mail.fromId)}`,
      to: `${to.username} #${userIdToTag(mail.toId)}`,
      subject: mail.subject,
      body: mail.body,
    };
  } catch (err) {
    throw err;
  }
};

export const parseMail = (mail) => {
  return Promise.all(
    mail.map((mail) =>
      DB.users.get(mail.fromId).then((user) => ({
        id: mail.id,
        from: user.username,
        subject: mail.subject,
        body: mail.body,
      }))
    )
  );
};

export const hasAccess = (mailId, userId) => {
  return new Promise((resolve, reject) => {
    DB.mail.get(Number(mailId))
      .then((mail) => {
        if (mail.fromId === userId || mail.toId === userId) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};