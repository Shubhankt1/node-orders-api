const express = require('express');

// Instantiate Express
const app = express();

// routes
const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// Routes
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Error Handling here.

// If requests reach this point, it means
// none of the routes above handled it.
app.use((req, res, next) => {
	const error = new Error('Not Found!');
	error.status = 404;
	next(error);
});

// Error handling for 500 errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;