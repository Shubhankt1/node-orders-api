const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'All the Products are here.'
	});
});

router.post('/', (req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	};
	res.status(200).json({
		message: 'Added product here.',
		createdProduct: product
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	if (id === 'special') {
		res.status(200).json({
			message: 'Special ID found!',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'Found an ID!',
			id: id
		});
	}
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