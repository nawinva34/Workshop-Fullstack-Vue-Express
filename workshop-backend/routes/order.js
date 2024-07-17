const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.get('/v1/orders', isAuthenticated, orderController.getAllOrders);
router.get('/v1/products/:id/orders', isAuthenticated, orderController.getOrdersByProductId);
router.post('/v1/products/:productId/orders', isAuthenticated, orderController.createOrder);

module.exports = router;
