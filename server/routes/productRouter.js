import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  filterProducts,
  getAllProducts,
  getSingleProduct,
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
  calculateTotal,
  checkout,
} from "../controllers/productController.js";
import { validateAddProduct } from "../middlewares/validator.js";
import { isLoggedin } from "../middlewares/isLoggedIn.js";

const router = Router();

router
  .route("/")
  .get(isLoggedin, getAllProducts)
  .post(validateAddProduct, addProduct)
  .patch(editProduct)
  .delete(deleteProduct);

router.route("/:id").get(getSingleProduct);
router.route("/filter").post(isLoggedin, filterProducts);
router.route("/addToCart").post(isLoggedin, addToCart);
router.route("/getCartItems").post(isLoggedin, getCartItems);
router.route("/removeCartItem").post(isLoggedin, removeCartItem);
router
  .route("/updateCartItemQuantity")
  .post(isLoggedin, updateCartItemQuantity);
router.route("/calculateTotal").post(isLoggedin, calculateTotal);
router.route("/checkout").post(isLoggedin, checkout);
// router.route("/checkoutReport").post(sendCheckoutReport);

export default router;
