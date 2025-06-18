const db = require('../models');
const { handleError } = require('../utils/errorHandler');

/**
 * Get all gear items for the current user
 */
exports.getAllGear = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const gearItems = await db.GearItem.findAll({
      where: { userId },
      include: [
        { model: db.GearCategory, as: 'category' },
        { model: db.ItemImage, as: 'images' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json(gearItems);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Search gear items with filters
 */
exports.searchGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      query, category, minValue, maxValue, status, 
      sortBy, sortOrder, page, limit 
    } = req.query;
    
    // Build filter conditions
    const whereConditions = { userId };
    
    if (query) {
      whereConditions[db.Sequelize.Op.or] = [
        { name: { [db.Sequelize.Op.iLike]: `%${query}%` } },
        { brand: { [db.Sequelize.Op.iLike]: `%${query}%` } },
        { model: { [db.Sequelize.Op.iLike]: `%${query}%` } },
        { description: { [db.Sequelize.Op.iLike]: `%${query}%` } }
      ];
    }
    
    if (category) {
      whereConditions.categoryId = category;
    }
    
    if (minValue) {
      whereConditions.currentValue = { 
        ...whereConditions.currentValue,
        [db.Sequelize.Op.gte]: minValue 
      };
    }
    
    if (maxValue) {
      whereConditions.currentValue = { 
        ...whereConditions.currentValue,
        [db.Sequelize.Op.lte]: maxValue 
      };
    }
    
    if (status) {
      whereConditions.status = status;
    }
    
    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    
    // Sorting
    const order = [];
    if (sortBy) {
      order.push([sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']);
    } else {
      order.push(['createdAt', 'DESC']);
    }
    
    // Execute query
    const { count, rows } = await db.GearItem.findAndCountAll({
      where: whereConditions,
      include: [
        { model: db.GearCategory, as: 'category' },
        { model: db.ItemImage, as: 'images' }
      ],
      order,
      limit: pageSize,
      offset
    });
    
    return res.status(200).json({
      items: rows,
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: pageNumber
    });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get gear statistics
 */
exports.getGearStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get total item count
    const totalCount = await db.GearItem.count({ where: { userId } });
    
    // Get count by category
    const categoryStats = await db.GearItem.findAll({
      attributes: [
        [db.Sequelize.fn('COUNT', db.Sequelize.col('GearItem.id')), 'count']
      ],
      include: [{
        model: db.GearCategory,
        as: 'category',
        attributes: ['id', 'name']
      }],
      where: { userId },
      group: ['category.id', 'category.name']
    });
    
    // Get total value
    const totalValue = await db.GearItem.sum('currentValue', { where: { userId } });
    
    // Get count by status
    const statusStats = await db.GearItem.findAll({
      attributes: [
        'status',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('GearItem.id')), 'count']
      ],
      where: { userId },
      group: ['status']
    });
    
    // Get maintenance due
    const maintenanceDue = await db.MaintenanceReminder.count({
      include: [{
        model: db.GearItem,
        as: 'gearItem',
        where: { userId }
      }],
      where: {
        nextDate: {
          [db.Sequelize.Op.lte]: new Date()
        }
      }
    });
    
    return res.status(200).json({
      totalItems: totalCount,
      totalValue: totalValue || 0,
      maintenanceDue,
      byCategory: categoryStats,
      byStatus: statusStats
    });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get gear item by ID
 */
exports.getGearById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const gearItem = await db.GearItem.findOne({
      where: { id, userId },
      include: [
        { model: db.GearCategory, as: 'category' },
        { model: db.ItemImage, as: 'images' },
        { model: db.ItemSpecification, as: 'specifications' },
        { 
          model: db.MaintenanceRecord, 
          as: 'maintenanceRecords',
          order: [['maintenanceDate', 'DESC']]
        },
        { 
          model: db.MaintenanceReminder, 
          as: 'maintenanceReminders',
          order: [['nextDate', 'ASC']]
        }
      ]
    });
    
    if (!gearItem) {
      return res.status(404).json({ message: 'Gear item not found' });
    }
    
    return res.status(200).json(gearItem);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Create a new gear item
 */
exports.createGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const gearData = { ...req.body, userId };
    
    const newGear = await db.GearItem.create(gearData);
    
    // Create specifications if provided
    if (req.body.specifications && req.body.specifications.length > 0) {
      const specs = req.body.specifications.map(spec => ({
        ...spec,
        gearItemId: newGear.id
      }));
      
      await db.ItemSpecification.bulkCreate(specs);
    }
    
    // Create maintenance reminders if provided
    if (req.body.maintenanceReminders && req.body.maintenanceReminders.length > 0) {
      const reminders = req.body.maintenanceReminders.map(reminder => ({
        ...reminder,
        gearItemId: newGear.id
      }));
      
      await db.MaintenanceReminder.bulkCreate(reminders);
    }
    
    // Fetch the created gear with all associations
    const createdGear = await db.GearItem.findByPk(newGear.id, {
      include: [
        { model: db.GearCategory, as: 'category' },
        { model: db.ItemSpecification, as: 'specifications' },
        { model: db.MaintenanceReminder, as: 'maintenanceReminders' }
      ]
    });
    
    return res.status(201).json(createdGear);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Update a gear item
 */
exports.updateGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    // Check if gear item exists and belongs to the user
    const gearItem = await db.GearItem.findOne({ where: { id, userId } });
    
    if (!gearItem) {
      return res.status(404).json({ message: 'Gear item not found' });
    }
    
    // Update gear item
    await gearItem.update(req.body);
    
    // Update specifications if provided
    if (req.body.specifications) {
      // Delete existing specs
      await db.ItemSpecification.destroy({ where: { gearItemId: id } });
      
      // Create new specs
      if (req.body.specifications.length > 0) {
        const specs = req.body.specifications.map(spec => ({
          ...spec,
          gearItemId: id
        }));
        
        await db.ItemSpecification.bulkCreate(specs);
      }
    }
    
    // Update maintenance reminders if provided
    if (req.body.maintenanceReminders) {
      // Delete existing reminders
      await db.MaintenanceReminder.destroy({ where: { gearItemId: id } });
      
      // Create new reminders
      if (req.body.maintenanceReminders.length > 0) {
        const reminders = req.body.maintenanceReminders.map(reminder => ({
          ...reminder,
          gearItemId: id
        }));
        
        await db.MaintenanceReminder.bulkCreate(reminders);
      }
    }
    
    // Fetch the updated gear with all associations
    const updatedGear = await db.GearItem.findByPk(id, {
      include: [
        { model: db.GearCategory, as: 'category' },
        { model: db.ItemImage, as: 'images' },
        { model: db.ItemSpecification, as: 'specifications' },
        { model: db.MaintenanceReminder, as: 'maintenanceReminders' }
      ]
    });
    
    return res.status(200).json(updatedGear);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Delete a gear item
 */
exports.deleteGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    // Check if gear item exists and belongs to the user
    const gearItem = await db.GearItem.findOne({ where: { id, userId } });
    
    if (!gearItem) {
      return res.status(404).json({ message: 'Gear item not found' });
    }
    
    // Delete associated records
    await db.ItemSpecification.destroy({ where: { gearItemId: id } });
    await db.MaintenanceRecord.destroy({ where: { gearItemId: id } });
    await db.MaintenanceReminder.destroy({ where: { gearItemId: id } });
    
    // Delete images and their files (this would use a file storage service)
    const images = await db.ItemImage.findAll({ where: { gearItemId: id } });
    for (const image of images) {
      // Delete the file from storage (AWS S3, etc.)
      // await deleteFileFromStorage(image.imageUrl);
      await image.destroy();
    }
    
    // Delete shared access records
    await db.SharedAccess.destroy({ where: { gearItemId: id } });
    
    // Delete the gear item itself
    await gearItem.destroy();
    
    return res.status(200).json({ message: 'Gear item deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Upload images for a gear item
 */
exports.uploadImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    // Check if gear item exists and belongs to the user
    const gearItem = await db.GearItem.findOne({ where: { id, userId } });
    
    if (!gearItem) {
      return res.status(404).json({ message: 'Gear item not found' });
    }
    
    // Handle file uploads
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Process each uploaded file
    const uploadedImages = [];
    for (const file of req.files) {
      // In a real app, file would be uploaded to S3 or similar service
      // For this example, we'll just store the file info locally
      const imageData = {
        gearItemId: id,
        imageUrl: file.path, // In real app, this would be the S3 URL
        imageType: req.body.imageType || 'main',
        caption: req.body.caption || file.originalname
      };
      
      const image = await db.ItemImage.create(imageData);
      uploadedImages.push(image);
    }
    
    return res.status(201).json(uploadedImages);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Delete an image
 */
exports.deleteImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId } = req.params;
    
    // Check if image exists and belongs to the user's gear
    const image = await db.ItemImage.findOne({
      include: [{
        model: db.GearItem,
        as: 'gearItem',
        where: { userId }
      }],
      where: { id: imageId }
    });
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Delete the file from storage (AWS S3, etc.)
    // await deleteFileFromStorage(image.imageUrl);
    
    // Delete the image record
    await image.destroy();
    
    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Share gear item(s) with another user
 */
exports.shareGear = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sharedWithEmail, gearItemId, accessLevel, expirationDate } = req.body;
    
    // Find the user to share with
    const sharedWithUser = await db.User.findOne({ where: { email: sharedWithEmail } });
    
    if (!sharedWithUser) {
      return res.status(404).json({ message: 'User not found with that email' });
    }
    
    // Check if gear item exists and belongs to the user
    if (gearItemId) {
      const gearItem = await db.GearItem.findOne({ where: { id: gearItemId, userId } });
      
      if (!gearItem) {
        return res.status(404).json({ message: 'Gear item not found' });
      }
    }
    
    // Create the sharing record
    const shareData = {
      userId,
      sharedWithId: sharedWithUser.id,
      gearItemId, // Can be null to share all items
      accessLevel: accessLevel || 'view',
      expirationDate: expirationDate || null
    };
    
    const sharedAccess = await db.SharedAccess.create(shareData);
    
    return res.status(201).json(sharedAccess);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get gear items shared with the current user
 */
exports.getSharedGear = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all sharing records where the current user is the recipient
    const sharedRecords = await db.SharedAccess.findAll({
      where: { 
        sharedWithId: userId,
        [db.Sequelize.Op.or]: [
          { expirationDate: null },
          { expirationDate: { [db.Sequelize.Op.gt]: new Date() } }
        ]
      },
      include: [{
        model: db.User,
        as: 'owner',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    });
    
    // Get IDs of users who have shared with the current user
    const ownerIds = [...new Set(sharedRecords.map(record => record.userId))];
    
    // Get all gear items shared with the current user
    const sharedGear = [];
    
    for (const ownerId of ownerIds) {
      // Get sharing records for this owner
      const ownerSharing = sharedRecords.filter(record => record.userId === ownerId);
      
      // Check if owner has shared all items
      const hasSharedAll = ownerSharing.some(record => record.gearItemId === null);
      
      // Get shared gear items
      let gearQuery = {
        where: { userId: ownerId },
        include: [
          { model: db.GearCategory, as: 'category' },
          { model: db.ItemImage, as: 'images', limit: 1 }
        ]
      };
      
      // If not sharing all, filter by specific gear IDs
      if (!hasSharedAll) {
        const sharedItemIds = ownerSharing
          .filter(record => record.gearItemId !== null)
          .map(record => record.gearItemId);
        
        gearQuery.where.id = { [db.Sequelize.Op.in]: sharedItemIds };
      }
      
      const items = await db.GearItem.findAll(gearQuery);
      
      // Add owner info to each item
      const ownerInfo = ownerSharing[0].owner;
      items.forEach(item => {
        item.dataValues.sharedBy = {
          id: ownerInfo.id,
          name: `${ownerInfo.firstName} ${ownerInfo.lastName}`,
          email: ownerInfo.email
        };
      });
      
      sharedGear.push(...items);
    }
    
    return res.status(200).json(sharedGear);
  } catch (error) {
    return handleError(res, error);
  }
};