import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  seeProduct,
} from "../controllers/productController.js";
const router = Router();

router
  .route("/")
  .get(seeProduct)
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);

export default router;
