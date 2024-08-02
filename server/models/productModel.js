import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: String,
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
    description: String,
    model: String,
    productDate: String,
    condition: {
      type: String,
      enum: ["new", "used"],
    },
    photo: String,
    price: Number,
    inStock: String,
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

export default mongoose.model("Products", ProductSchema);
