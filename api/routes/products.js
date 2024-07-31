const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Product Model
const Product = require('../models/product');

// Get All Products
router.get('/', (req, res, next) => {
	Product
		.find()
		.exec()
		.then(docs => {
			console.log("Products:\n", docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log("Error:\n", err);
			res.status(500).json({
				error: err
			});
		})
});

// Add a Product
router.post('/', (req, res, next) => {
	// Create the Product instance
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});

	// Save the Product and perform post-save logic
	// and Error handling.
	product
		.save()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: 'Added product here.',
				createdProduct: product
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// Get a Product
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Product.findById(id)
		.exec()
		.then(doc => {
			if (doc) {
				console.log('From Database:\n', doc);
				res.status(200).json(doc);
			} else {
				console.log('No Produt found with ID: ', id);
				res.status(404).json({
					message: 'No Product found for provided ID.'
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

// Update a Product
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	Product
		.findOneAndUpdate(
			{ _id: id },
			{ $set: req.body },
			{ new: true }
		)
		.exec()
		.then(result => {
			console.log("Result:\n", result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log("Error:\n", err);
			res.status(500).json({
				error: err
			});
		});
});

// Delet a Product
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Product
		.deleteOne({ _id: id })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log("Error:\n", err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;