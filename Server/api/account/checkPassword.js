import { readByUserId } from "../../../DBtools/read.js";
import { verifyPassword } from "../../Encryption/encryption.js";

export default (req, res, session) => {
    const { password } = req.body;
    return readByUserId(session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (verifyPassword(password, user.hashedPassword)) {
                return res.status(200).json({ ok: true, message: 'Password is correct' });
            }
            return res.status(401).json({ ok: false, message: 'Password is incorrect' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
}