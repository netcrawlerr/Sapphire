import mongoose from "mongoose";
import Products from "../models/productModel.js";
import Cart from "../models/cartItemModel.js";
import parsePriceRange from "../utils/priceFiltering.js";

export const addProduct = async (req, res) => {
  const addedProduct = await Products.create(req.body);
  res.json({ addedProduct });
};
export const editProduct = () => {};
export const deleteProduct = () => {};

export const getAllProducts = async (req, res) => {
  console.log("req.user from gellAllProducts", req.user);

  const products = await Products.find({});
  res.json(products);
  // console.log("Products are", products);
};

export const getSingleProduct = async (req, res) => {
  console.log("hey");
  const { id } = req.params;
  console.log("req,params.id", id);

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const product = await Products.findById(id);
  if (product) {
    console.log("product is", product);
    res.json({ product });
  } else {
    res.status(404).send("Product not found");
  }
};

export const filterProducts = async (req, res) => {
  const { category, price, condition } = req.body;
  console.log("Filtering Products");
  console.log("price from body", price);

  console.log(category, condition);
  const query = {};
  if (category && category !== "all") query.category = category;
  if (condition && condition !== "all") query.condition = condition;

  if (price && price !== "all") {
    // console.log("price is", price, typeof price);
    const [minPrice, maxPrice] = parsePriceRange(price);
    console.log(minPrice, maxPrice);
    query.price = {};
    if (minPrice !== null) query.price.$gte = minPrice;
    if (maxPrice !== null) query.price.$lte = maxPrice;
  }

  console.log(query);

  const filteredProduct = await Products.find(query);
  res.json(filteredProduct);
};

export const addToCart = async (req, res) => {
  console.log("req.user is ", req.user);

  console.log("To Receive Single Product");
  // const userId = "66a9d63ec546d74f4d833718"; // Replace with actual user ID
  const userId = req.user.userId; // Replace with actual user ID

  const defaultQuantity = 1;
  try {
    // Get single item from request body
    const singleItem = req.body.singleItem;

    // Validate input
    if (!singleItem || !singleItem._id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get the product details
    const product = await Products.findById(singleItem._id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a cart item with the necessary fields
    const data = {
      product: singleItem._id,
      quantity: defaultQuantity,
      name: product.name,
      price: product.price,
      photo: product.photo,
    };

    console.log(data);

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart if none exists for the user
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === singleItem._id
    );

    if (itemIndex > -1) {
      // Product already in cart, update the quantity
      cart.items[itemIndex].quantity += defaultQuantity;
    } else {
      // Product not in cart, add new item
      cart.items.push(data);
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    console.log("req.user from getcartItems", req.user);

    // to get cart by user i have to get user id (the logged user)
    const cartData = await Cart.find({ user: req.user.userId });
    res.status(200).json({ cart: cartData[0].items });
    console.log("product controller getCart Items", cartData[0].items);
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (req, res) => {
  // const userId = "66a9d63ec546d74f4d833718"; // Replace with actual user ID// Replace with the actual way of getting the user ID, e.g., from JWT
  const userId = req.user.userId; // Replace with actual user ID// Replace with the actual way of getting the user ID, e.g., from JWT
  const { itemId } = req.body;

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save(); // Save the updated cart
      console.log("After remove items cart items are ", cart);

      return res.status(200).json({ message: "Item removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const userId = req.user.userId; // User ID from the request
  const { itemId, quantity } = req.body; // Item ID and new quantity from the request body

  if (!itemId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex > -1) {
      // Find the product in the Products collection
      const product = await Products.findById(cart.items[itemIndex].product);

      console.log("product from updatequantity", product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the requested quantity is less than or equal to the available stock
      if (Number(quantity) > product.inStock) {
        return res.status(400).json({
          message: `Only ${product.inStock} items available in stock`,
        });
      }

      // Update the quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save(); // Save the updated cart

      console.log("After Update items cart items are ", cart);

      return res.status(200).json({ message: "Item quantity updated", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const calculateTotal = async (req, res) => {
  try {
    // Get the user's ID from the request (assuming user is authenticated and ID is available)
    // const userId = "66a9d63ec546d74f4d833718";
    const userId = req.user.userId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    // If the cart doesn't exist or is empty
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Calculate the total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Respond with the total
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error calculating total:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const checkout = async (req, res) => {
  const { total, cartData } = req.body;
  // const userId = "66a9d63ec546d74f4d833718"; // Replace with actual user ID
  const userId = req.user.userId; // Replace with actual user ID

  try {
    // Loop through each item in the cart
    for (const cartItem of cartData) {
      // Find the corresponding product in the Products collection
      const product = await Products.findById(cartItem.product);

      if (product) {
        // Decrease the quantity of the product by the quantity in the cart
        const newQuantity = product.inStock - cartItem.quantity;

        // If the new quantity is less than 0, set it to 0 and mark the product as sold out
        if (newQuantity <= 0) {
          product.inStock = 0;
          product.status = "soldout";
        } else {
          product.inStock = newQuantity;
        }

        // Save the updated product
        await product.save();
      }
    }

    // Remove checked-out items from the Cart collection
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Clear the items array or remove the checked-out items
      cart.items = [];
      await cart.save();
    }

    // Respond with the checkout items and total
    res.json({ total, checkoutItems: cartData });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// export const checkout = async (req, res) => {
//   const { total, cartData } = req.body;

//   const productsId = cartData.map((item) => item.product);

//   const checkoutItems = cartData.map((item) => ({
//     name: item.name,
//     vat: item.price * 0.15,
//     price: item.price,
//     total: item.price * 0.15 + item.price,
//     quantity: item.quantity,
//     purchasedBy: "Abebe",
//   }));

//   console.log("im going to delete the product with this ", productsId);

//   console.log("checked out items", checkoutItems);
//   console.log("Total is ", total);

//   res.json({ total, checkoutItems });

//   // console.log(total, cartData);
// };
