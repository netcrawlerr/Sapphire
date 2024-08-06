import { verifyJWTToken } from "../utils/tokenUtils.js";

export const isLoggedin = (req, res, next) => {
  const { token } = req.cookies;
  console.log("token from cookies", token);

  if (!token) {
    return res.status(401).json({ msg: "unauthenticated user" });
  }
  try {
    const { userId, firstName } = verifyJWTToken(token);
    req.user = { userId, firstName };
    console.log(req.user.firstName);
    next(); // move on to next middleware if everything is cool
  } catch (error) {
    return res.status(401).json({ msg: "unauthenticated user" });
  }
};
