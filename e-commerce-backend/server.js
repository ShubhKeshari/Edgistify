// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const cartRoutes = require("./src/routes/cart.routes");
const orderRoutes = require("./src/routes/order.routes");

// Import middleware
//const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
//app.use(errorHandler);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
