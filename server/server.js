import express from "express";
const app = express();

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  await User.create(req.body);
  await Product.create(req.body);
  res.send("User & Product Created");
});

app.use("/api/auth/", authRouter);
app.use("/api/products/", productRouter);
app.use("/api/products/customer", customerRouter);

app.use("*", (req, res) => {
  res.json({ msg: "Not Found" });
});

const PORT = process.env.PORT || 5000;
try {
  await mongoose.connect("mongodb://localhost:27017/Sapphire");
  console.log("Connected To MongoDB..");
  app.listen(PORT, () => {
    console.log("Server Running on Port ", PORT);
  });
} catch (error) {
  console.log(error);
}
