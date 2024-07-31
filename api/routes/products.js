const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Product Model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'All the Products are here.'
	});
});

router.post('/', (req, res, next) => {
	// Create the Product instance
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});

	// Save the Product and perform post-save logic
	// and Error handling.
	product.save()
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

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Updated Product!',
		id: id
	});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Deleted Product!',
		id: id
	});
});

module.exports = router;