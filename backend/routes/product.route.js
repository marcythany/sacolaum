import express from 'express';

import {
	createProductController,
	deleteProductController,
	getProducts,
	updateProductController,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;
