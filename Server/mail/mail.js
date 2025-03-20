import {
  readByUserId,
  getMailToUserId,
  getMailByEmailId,
} from "../DBtools/read.js";

export const getMail = (userId) => {
  return getMailToUserId(userId);
};

export const getMailById = (emailId) => {
  return new Promise((resolve, reject) => {
    getMailByEmailId(Number(emailId))
      .then((mail) => {
        readByUserId(mail.fromId)
          .then((from) => {
            readByUserId(mail.toId).then((to) => {
              resolve({
                id: mail.emailId,
                from: from.username,
                to: to.username,
                subject: mail.subject,
                body: mail.body,
              });
            });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const parseMail = (mail) => {
  return Promise.all(
    mail.map((mail) =>
      readByUserId(mail.fromId).then((user) => ({
        id: mail.emailId,
        from: user.username,
        subject: mail.subject,
        body: mail.body,
      }))
    )
  );
};
