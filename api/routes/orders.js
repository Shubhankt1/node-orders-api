const express = require("express");

// Router
const router = express.Router();

// Middleware
const checkAuth = require("../middleware/auth");

// Controllers
const OrdersController = require("../controllers/orders");

// Get all Orders
router.get("/", checkAuth, OrdersController.orders_get_all);

// Add an Order
router.post("/", checkAuth, OrdersController.create_order);

router.get("/:id", checkAuth, OrdersController.get_order_by_id);

router.delete("/:id", checkAuth, OrdersController.delete_order);

module.exports = router;
