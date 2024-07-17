const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/v1/register', authController.register);
router.post('/v1/login', authController.login);
router.put('/v1/approve/:id', isAuthenticated, isAdmin, authController.approveUser);

module.exports = router;
