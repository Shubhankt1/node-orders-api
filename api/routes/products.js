// Express instance
const express = require("express");

// Mongoose instance
const mongoose = require("mongoose");

// Router
const router = express.Router();

// Middleware
// Auth
const checkAuth = require("../middleware/auth");

// Controllers
const ProductsController = require("../controllers/products");

// Get All Products
router.get("/", ProductsController.products_get_all);

// Add a Product
router.post("/", checkAuth, ProductsController.create_product);

// Get a Product
router.get("/:id", ProductsController.get_product_by_id);

// Update a Product
router.patch("/:id", checkAuth, ProductsController.update_product);

// Delet a Product
router.delete("/:id", checkAuth, ProductsController.delete_product);

module.exports = router;
