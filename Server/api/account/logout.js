import { deleteSession } from "../../DBtools/write.js";

export default (_req, res, session) => {
    if (!session) {
        return res.status(401).json({ message: "Failed to fetch sessionId" });
    }
    deleteSession(session.sessionId)
        .then(() => {
            res.clearCookie("sessionId");
            return res.status(200).json({ message: "Logout successful!" });
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
};