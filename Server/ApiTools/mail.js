import {
  readByUserId,
  getMailToUserId,
  getMailByEmailId,
} from "../../DBtools/read.js";
import { userIdToTag } from "../ApiTools/account.js";

export const getMail = (userId) => {
  return getMailToUserId(userId);
};

export const getMailById = async (emailId) => {
  try {
    const mail = await getMailByEmailId(Number(emailId));
    const from = await readByUserId(mail.fromId);
    const to = await readByUserId(mail.toId);

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
      readByUserId(mail.fromId).then((user) => ({
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
    getMailByEmailId(Number(mailId))
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