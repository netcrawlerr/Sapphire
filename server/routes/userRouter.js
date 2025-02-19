import Router from "express";
import { getUserData } from "../controllers/authController.js";
import { isLoggedin } from "../middlewares/isLoggedIn.js";
const router = Router();

router.get("/getUserData", isLoggedin, getUserData);

export default router;
