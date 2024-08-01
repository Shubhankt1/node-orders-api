const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Product Model
const Product = require('../models/product');

// Get All Products
router.get('/', (req, res, next) => {
	Product
		.find()
		.select('name price _id')
		.exec()
		.then(docs => {
			console.log("Products:\n", docs);
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						name: doc.name,
						price: doc.price,
						_id: doc._id,
						product_requests: {
							details: {
								type: 'GET',
								url: 'http://localhost:3000/products/' + doc._id
							},
							delete: {
								type: 'DELETE',
								url: 'http://localhost:3000/products/' + doc._id
							},
							update: {
								type: 'PATCH',
								url: 'http://localhost:3000/products/' + doc._id,
								body: {
									name: "updated name or ignore",
									price: "updated price or ignore"
								}
							}
						}
					}
				}),
				requests: {
					add: {
						type: 'POST',
						url: 'http://localhost:3000/products/'
					}
				}
			};
			res.status(200).json(response);
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
			const response = {
				message: 'Added product here.',
				createdProduct: {
					name: result.name,
					price: result.price,
					_id: result._id,
					product_requests: {
						details: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + result._id
						},
						delete: {
							type: 'DELETE',
							url: 'http://localhost:3000/products/' + result._id
						},
						update: {
							type: 'PATCH',
							url: 'http://localhost:3000/products/' + result._id,
							body: {
								name: "updated name or ignore",
								price: "updated price or ignore"
							}
						}
					}
				},
				requests: {
					list: {
						type: 'GET',
						url: 'http://localhost:3000/products/'
					}
				}
			};
			res.status(201).json(response);
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
		.select('name price _id')
		.exec()
		.then(doc => {
			if (doc) {
				console.log('From Database:\n', doc);
				const response = {
					product: {
						name: doc.name,
						price: doc.price,
						_id: doc._id,
						product_requests: {
							delete: {
								type: 'DELETE',
								url: 'http://localhost:3000/products/' + doc._id
							},
							update: {
								type: 'PATCH',
								url: 'http://localhost:3000/products/' + doc._id,
								body: {
									name: "updated name or ignore",
									price: "updated price or ignore"
								}
							}
						}
					},
					requests: {
						list: {
							type: 'GET',
							url: 'http://localhost:3000/products/'
						},
						add: {
							type: 'POST',
							url: 'http://localhost:3000/products/'
						}
					}
				};
				res.status(200).json(response);
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
			const response = {
				message: "Updaded Product Successfully!",
				product: {
					name: result.name,
					price: result.price,
					_id: result._id,
					product_requests: {
						details: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + result._id
						},
						delete: {
							type: 'DELETE',
							url: 'http://localhost:3000/products/' + result._id
						},
					}
				},
				requests: {
					list: {
						type: 'GET',
						url: 'http://localhost:3000/products/'
					},
					add: {
						type: 'POST',
						url: 'http://localhost:3000/products/'
					}
				}
			};
			res.status(200).json(response);
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
			res.status(200).json({
				message: "Product Deleted!",
				result: result,
				requests: {
					list: {
						type: 'GET',
						url: 'http://localhost:3000/products/'
					},
					add: {
						type: 'POST',
						url: 'http://localhost:3000/products/'
					}
				}
			});
		})
		.catch(err => {
			console.log("Error:\n", err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;