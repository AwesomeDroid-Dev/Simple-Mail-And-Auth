import { readByUsername } from '../../../DBtools/read.js';
import { DB } from '../../../DBtools/write.js';
import { hashPassword } from '../../Encryption/encryption.js';
import { createSessionId } from '../../ApiTools/Session.js';
import logger from '../../logger.js';

export default async (req, res) => {
    const { username, password } = req.body;
    logger.info(`User ${username} is attempting to sign up`);
    const user = await readByUsername(username);
    logger.info('Checking if user already exists');
    if (user) {
        logger.info('User already exists');
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = hashPassword(password);
    const userId = generateUserID();
    await DB.users.insert([userId, username, hashedPassword]);
    logger.info('Signup successful! ');
    const sessionId = await createSessionId(userId);
    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        sameSite: 'strict'
    });
    return res.status(200).json({
        success: true,
        message: 'Signup successful!',
        sessionId: sessionId
    });
};

const generateUserID = () => {
    let min = 1000000000;
    let max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };