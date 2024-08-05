// Express instance
const express = require("express");

// Express Router
const router = express.Router();

const checkAuth = require("../middleware/auth");

// Controller
const UsersController = require("../controllers/users");

// Create new User
router.post("/signup", UsersController.signup);

// Login User
router.post("/login", UsersController.login);

// Delete User
router.delete("/:userId", checkAuth, UsersController.delete_user);

module.exports = router;
