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
  checkout
} from "../controllers/productController.js";
import { validateAddProduct } from "../middlewares/validator.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(validateAddProduct, addProduct)
  .patch(editProduct)
  .delete(deleteProduct);

router.route("/:id").get(getSingleProduct);
router.route("/filter").post(filterProducts);
router.route("/addToCart").post(addToCart);
router.route("/getCartItems").post(getCartItems);
router.route("/removeCartItem").post(removeCartItem);
router.route("/updateCartItemQuantity").post(updateCartItemQuantity);
router.route("/calculateTotal").post(calculateTotal);
router.route("/checkout").post(checkout);

export default router;
