// src/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cart.controller");
const { protect } = require("../middleware/auth.middleware"); // Import auth middleware

// Apply protect middleware to require authentication
router.post("/add-to-cart", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update-cart/:productId", protect, updateCartItem);
router.delete("/remove-from-cart/:productId", protect, removeFromCart);

module.exports = router;
