const express = require('express');
const router = express.Router();
const gearController = require('../controllers/gear.controller');
const { validateGearItem } = require('../middleware/validation.middleware');
const upload = require('../middleware/upload.middleware');

/**
 * @route GET /api/gear
 * @desc Get all gear items for the current user
 * @access Private
 */
router.get('/', gearController.getAllGear);

/**
 * @route GET /api/gear/search
 * @desc Search gear items with filters
 * @access Private
 */
router.get('/search', gearController.searchGear);

/**
 * @route GET /api/gear/stats
 * @desc Get gear statistics (count by category, total value, etc.)
 * @access Private
 */
router.get('/stats', gearController.getGearStats);

/**
 * @route GET /api/gear/:id
 * @desc Get gear item by ID
 * @access Private
 */
router.get('/:id', gearController.getGearById);

/**
 * @route POST /api/gear
 * @desc Create a new gear item
 * @access Private
 */
router.post('/', validateGearItem, gearController.createGear);

/**
 * @route PUT /api/gear/:id
 * @desc Update a gear item
 * @access Private
 */
router.put('/:id', validateGearItem, gearController.updateGear);

/**
 * @route DELETE /api/gear/:id
 * @desc Delete a gear item
 * @access Private
 */
router.delete('/:id', gearController.deleteGear);

/**
 * @route POST /api/gear/:id/images
 * @desc Upload images for a gear item
 * @access Private
 */
router.post('/:id/images', upload.array('images', 5), gearController.uploadImages);

/**
 * @route DELETE /api/gear/images/:imageId
 * @desc Delete an image
 * @access Private
 */
router.delete('/images/:imageId', gearController.deleteImage);

/**
 * @route POST /api/gear/share
 * @desc Share gear item(s) with another user
 * @access Private
 */
router.post('/share', gearController.shareGear);

/**
 * @route GET /api/gear/shared-with-me
 * @desc Get gear items shared with the current user
 * @access Private
 */
router.get('/shared-with-me', gearController.getSharedGear);

module.exports = router;