import { DB } from "../../../DBtools/write.js";
import logger from "../../logger.js";

export default (_req, res, session) => {
    logger.info(`User ${session.userId} is attempting to log out`);
    if (!session) {
        return res.status(401).json({ message: "Failed to fetch session" });
    }
    logger.info("Logging out!");
    DB.sessions.remove({ id: session.id })
        .then(() => {
            res.clearCookie("sessionId");
            logger.info("Logout successful!");
            return res.status(200).json({ message: "Logout successful!" });
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
};