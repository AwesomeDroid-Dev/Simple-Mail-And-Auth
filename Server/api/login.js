import { readByUsername } from '../DBtools/read.js';
import { verifyPassword } from '../Encryption/encryption.js';

export default (req, res) => {
    const { username, password } = req.body;
    console.log(`User ${username} is attempting to log in`);
    readByUsername(username)
        .then(user => {
            if (!user || !verifyPassword(password, user.hashedPassword)) {
                console.log('Invalid credentials');
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            console.log('Login successful!');
            return res.status(200).json({ success: true, message: 'Login successful!', userId: user.userId });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
};

