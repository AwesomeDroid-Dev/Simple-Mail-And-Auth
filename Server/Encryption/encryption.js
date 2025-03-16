import crypto from 'crypto';

const hashPassword = (password) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('base64');
  return `${salt}$${hash}`;
};

const verifyPassword = (password, hashedPassword) => {
  const [salt, hash] = hashedPassword.split('$');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('base64');
  return verifyHash === hash;
};

export { hashPassword, verifyPassword };