const express = require("express");

// Instantiate Express
const app = express();

// Mongoose
const mongoose = require("mongoose");

// routes
const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

// Connect to mongoose
mongoose.connect(
  "mongodb+srv://shubhanktyagi:" +
    process.env.MongoAtlasPW +
    "@e-store.trvvhfo.mongodb.net/?retryWrites=true&w=majority&appName=E-Store"
);

// Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Body Parser
const bodyParser = require("body-parser");
// To parse URLEncoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse extended bodies with rich data
// To parse json
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", userRoutes);

// Error Handling here.

// If requests reach this point, it means
// none of the routes above handled it.
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

// Error handling for 500 errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
