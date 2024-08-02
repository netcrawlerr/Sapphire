import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";

const commonValidator = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ];
};
export const validateLogin = commonValidator([
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password required"),
]);

export const validateRegister = commonValidator([
  body("firstName").notEmpty().withMessage("First Name required"),
  body("lastName").notEmpty().withMessage("Last Name required"),
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User with this email already exists");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required"),
  body("password").custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
]);

export const validateAddProduct = commonValidator([
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("model").notEmpty().withMessage("Model can't be empty"),
  body("price")
    .notEmpty()
    .withMessage("price can't be empty")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("category")
    .notEmpty()
    .withMessage("Category can't be empty")
    .isIn([
      "laptops",
      "mobiles",
      "earphones",
      "networking-devices",
      "mouses",
      "keyboards",
      "flashes",
      "hard-disks",
      "ssd",
      "batteries",
    ])
    .withMessage("Invalid category"),
  body("status")
    .isIn(["available", "soldout"])
    .withMessage('Status must be either "available" or "soldout"'),

  // Middleware to check validation results
]);
