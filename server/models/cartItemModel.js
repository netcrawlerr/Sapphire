// CartModel.js
import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      // Reference to the Product model
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,

      // Ensure quantity is at least 1
      min: 1,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const CartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      // Reference to the User model
      ref: "User",
      required: true,
    },

    // Array of cart items
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
