const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'All the Orders are here.'
	});
});

router.post('/', (req, res, next) => {
	const order = {
		productId: req.body.productId,
		qty: req.body.qty
	};
	res.status(200).json({
		message: 'Added Order here.',
		order: order
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Order Details Found Here!',
		id: id
	});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Deleted the Order!',
		id: id
	});
});

module.exports = router;