import { readByUserId } from "../../../DBtools/read.js";
import { getMailById, hasAccess } from "../../ApiTools/mail.js";

export default (req, res, session) => {
    if (Number(req.query.emailId) === NaN) {
        return res.status(400).json({ message: "Invalid emailId" });
    }
    getMailById(req.query.emailId)
    .then((mail) => {
        hasAccess(req.query.emailId, session.userId)
        .then((hasAccess) => {
            if (hasAccess) {
                return res.status(200).json({ success: true, message: 'Mail retrieved successfully', mail: mail });
            } else {
                return res.status(401).json({ success: false, message: 'You do not have access to this mail' });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    });
}