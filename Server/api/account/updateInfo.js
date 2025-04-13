import { readByUserId } from '../../../DBtools/read.js';
import { DB } from '../../../DBtools/write.js';
import { hashPassword, verifyPassword } from '../../Encryption/encryption.js';
import logger from '../../logger.js';

export default async (req, res, session) => {
    const { password, changes } = req.body;
    const { username: newUsername, password: newPassword } = changes;
    const user = await readByUserId(session.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!verifyPassword(password, user.hashedPassword)) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    let updatedUser = {
        username: newUsername ? newUsername : user.username,
        hashedPassword: newPassword ? hashPassword(newPassword) : user.hashedPassword
    };
    logger.info(`Updating user info for user ${user.username}`);
    return DB.users.update({ userId: session.userId }, updatedUser)
        .then(() => {
            logger.info(`Updated user info for user ${user.username}`);
            return res.status(200).json({ success: true, message: 'User info updated successfully' });
        })
        .catch((err) => {
            logger.error(`Failed to update user info for user ${user.username}`);
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
};

