// src/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware"); // Import auth middleware

// Apply protect middleware to require authentication
router.post("/create-order", protect, createOrder);
router.get("/get-orders", protect, getOrders)

module.exports = router;
