import { DB } from "../../../DBtools/db.js";
import { tagToUserId } from "../../ApiTools/account.js";

export default (req, res, _session) => {
    const { username, tag } = req.body;
    if (!tag || !username) {
        return res.status(400).json({ message: "Recipient is required" });
    }
    DB.users.get(tagToUserId(tag)).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "Recipient not found" });
        }
        return res.status(200).json({ message: "Recipient selected successfully!", recipient: { username: user.username, tag: tag, userId: user.id } });
    });
};