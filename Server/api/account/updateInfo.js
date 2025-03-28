import { readByUserId } from '../../../DBtools/read.js';
import { editUser } from '../../../DBtools/write.js';
import { hashPassword, verifyPassword } from '../../Encryption/encryption.js';

export default (req, res, session) => {
    const { password, changes } = req.body;
    const { username: newUsername, password: newPassword } = changes;
    return readByUserId(session.userId)
        .then(user => {
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
            return editUser(user.userId, updatedUser)
                .then(() => {
                    return res.status(200).json({ success: true, message: 'User info updated successfully' });
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Internal Server Error' });
                });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
}