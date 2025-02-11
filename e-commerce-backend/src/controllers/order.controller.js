// // src/controllers/order.controller.js
// const Order = require('../models/Order');
// const Cart = require('../models/Cart');
// const Product = require('../models/Product');

// exports.createOrder = async (req, res) => {
//   try {
//     const { shippingAddress } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id })
//       .populate('items.product');

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: 'Cart is empty' });
//     }

//     // Validate stock and calculate total
//     let totalPrice = 0;
//     const orderItems = [];

//     for (const item of cart.items) {
//       const product = await Product.findById(item.product._id);

//       if (!product || product.stock < item.quantity) {
//         return res.status(400).json({
//           message: `Insufficient stock for ${product ? product.name : 'product'}`
//         });
//       }

//       // Update stock
//       product.stock -= item.quantity;
//       await product.save();

//       // Add to order items
//       orderItems.push({
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.product.price
//       });

//       totalPrice += item.product.price * item.quantity;
//     }

//     const order = await Order.create({
//       user: req.user._id,
//       items: orderItems,
//       totalPrice,
//       shippingAddress
//     });

//     // Clear cart
//     cart.items = [];
//     await cart.save();

//     await order.populate

// src/controllers/order.controller.js
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate stock and calculate total
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${
            product ? product.name : "product"
          }`,
        });
      }

      // Update stock
      product.stock -= item.quantity;
      await product.save();

      // Add to order items
      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      });

      totalPrice += item.product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      shippingAddress,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    await order.populate("items.product user");

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};


exports.getOrders = async (req, res) => {
  try {
    // Fetch all orders for the logged-in user
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
