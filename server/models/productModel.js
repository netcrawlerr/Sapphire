import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    category: {
      type: String,
      enum: [
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
      ],
    },
    condition: {
      type: String,
      enum: ["new", "used"],
    },
    photo: String,
    price: Number,
    inStock: Number,
    status: {
      type: String,
      enum: ["soldout", "available"],
      default: "available",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
