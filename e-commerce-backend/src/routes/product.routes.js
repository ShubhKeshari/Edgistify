// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const { getProduct, getProducts } = require('../controllers/product.controller');

router.get('/all-products', getProducts);

module.exports = router;