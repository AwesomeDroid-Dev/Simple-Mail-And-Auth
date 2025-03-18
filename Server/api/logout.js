import { deleteSession } from "../DBtools/write.js";
import { getCookieValue } from "../Session/Session.js";

export default (req, res) => {
    const sessionId = getCookieValue(req, "sessionId");
    if (!sessionId) {
        return res.status(401).json({ message: "Failed to fetch sessionId" });
    }
    deleteSession(sessionId)
        .then(() => {
            res.clearCookie("sessionId");
            return res.status(200).json({ message: "Logout successful!" });
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
};