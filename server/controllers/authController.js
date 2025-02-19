import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.json({ msg: "User Registered" });
};

export const login = async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  console.log("user to logiin", user);

  if (!user) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  const isValidUser =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!isValidUser) {
    return res.status(401).json({ msg: "invalid credentials" });
  }

  const token = createJWTToken({
    userId: user._id, //mdb id
    firstName: user.firstName,
  });

  console.log(token);
  console.log("From login", user);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });
  console.log("user logged in");

  res.json({ msg: "User Logged In" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  console.log("User loggef out");

  res.status(200).json({ msg: "user logged out" });
};

export const getUserData = (req, res) => {
  console.log("from get user data",req.user);

  const loggedInUser = req.user;
  res.json({ user: loggedInUser });
};
