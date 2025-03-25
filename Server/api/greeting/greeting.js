import { readByUserId } from "../../DBtools/read.js";

export default (_req, res, session) => {
  //It is not sessionId it is session
  return readByUserId(session.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ name: user.username, expirationDate: session.expirationDate });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
