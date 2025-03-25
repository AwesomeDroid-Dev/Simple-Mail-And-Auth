import { readByUsername } from '../../DBtools/read.js';
import { insertUser } from '../../DBtools/write.js';
import { hashPassword } from '../../Encryption/encryption.js';
import { createSessionId } from '../../ApiTools/Session.js';

export default (req, res) => {
    const { username, password } = req.body;
    // Add your logic to handle signup here
    console.log(`User ${username} is attempting to sign up`);
    readByUsername(username)
        .then(user => {
            if (user) {
                console.log('User already exists');
                return res.status(400).json({ success: false, message: 'User already exists' });
            }
            const hashedPassword = hashPassword(password);
            insertUser({ username, password: hashedPassword })
                .then(userId => {
                    console.log('Signup successful! ');
                    createSessionId(userId)
                        .then(sessionId => {
                            res.cookie('sessionId', sessionId, { httpOnly: true, sameSite: 'strict' });
                            return res.status(200).json({ success: true, message: 'Signup successful!', sessionId: sessionId });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.status(500).json({ success: false, message: 'Internal Server Error' });
                    })
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

