const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'All the Orders are here.'
	});
});

router.post('/', (req, res, next) => {
	res.status(200).json({
		message: 'Added Order here.'
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Order Details Here!',
		id: id
	});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Deleted Order!',
		id: id
	});
});

module.exports = router;