const express = require('express');

// Instantiate Express
const app = express();

// routes
const productsRoutes = require('./api/routes/products');

// Middleware
app.use('/products', productsRoutes);

module.exports = app;