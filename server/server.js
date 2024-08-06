import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "netcrawlerdev") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  await User.create(req.body);
  await Product.create(req.body);
  res.send("User & Product Created");
});

app.use("/api/auth/", authRouter);
app.use("/api/products/", productRouter);
app.use("/api/user/", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.json({ msg: "Not Found" });
});

const PORT = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected To MongoDB..");
  app.listen(PORT, () => {
    console.log("Server Running on Port ", PORT);
  });
} catch (error) {
  console.log(error);
}
