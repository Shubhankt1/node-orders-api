const express = require('express');

// Instantiate Express
const app = express();

// routes
const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Middleware
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;