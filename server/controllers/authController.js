import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.json({ msg: "User Registered" });
};

export const login = async (req, res) => {
    console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  const isValidUser =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!isValidUser) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  res.json({ msg: "User Logged In" });
};
export const logout = () => {};
