const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validation.middleware');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', validateRegistration, authController.register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and get token
 * @access Public
 */
router.post('/login', validateLogin, authController.login);

/**
 * @route POST /api/auth/refresh-token
 * @desc Refresh access token using refresh token
 * @access Public
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @route POST /api/auth/logout
 * @desc Logout user and invalidate refresh token
 * @access Protected
 */
router.post('/logout', authController.logout);

/**
 * @route POST /api/auth/password-reset
 * @desc Request password reset email
 * @access Public
 */
router.post('/password-reset', authController.requestPasswordReset);

/**
 * @route PUT /api/auth/password-reset/:token
 * @desc Reset password with token
 * @access Public
 */
router.put('/password-reset/:token', authController.resetPassword);

/**
 * @route GET /api/auth/me
 * @desc Get current user profile
 * @access Protected
 */
router.get('/me', authController.getCurrentUser);

module.exports = router;