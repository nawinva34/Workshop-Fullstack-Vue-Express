const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.get('/v1/products', isAuthenticated, productController.getAllProducts);
router.get('/v1/products/:id', isAuthenticated, productController.getProductById);
router.post('/v1/products', isAuthenticated, isAdmin, productController.createProduct);
router.put('/v1/products/:id', isAuthenticated, isAdmin, productController.updateProduct);
router.delete('/v1/products/:id', isAuthenticated, isAdmin, productController.deleteProduct);

module.exports = router;

