const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Initialize Sequelize with database config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
    pool: config.pool
  }
);

// Initialize db object
const db = {};

// Import models
db.User = require('./user.model')(sequelize, Sequelize);
db.GearCategory = require('./gear-category.model')(sequelize, Sequelize);
db.GearItem = require('./gear-item.model')(sequelize, Sequelize);
db.ItemSpecification = require('./item-specification.model')(sequelize, Sequelize);
db.ItemImage = require('./item-image.model')(sequelize, Sequelize);
db.MaintenanceRecord = require('./maintenance-record.model')(sequelize, Sequelize);
db.MaintenanceReminder = require('./maintenance-reminder.model')(sequelize, Sequelize);
db.SharedAccess = require('./shared-access.model')(sequelize, Sequelize);

// Define associations

// User-GearCategory (user can create custom categories)
db.User.hasMany(db.GearCategory, { foreignKey: 'userId', as: 'categories' });
db.GearCategory.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// User-GearItem
db.User.hasMany(db.GearItem, { foreignKey: 'userId', as: 'gearItems' });
db.GearItem.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// GearCategory-GearItem
db.GearCategory.hasMany(db.GearItem, { foreignKey: 'categoryId', as: 'gearItems' });
db.GearItem.belongsTo(db.GearCategory, { foreignKey: 'categoryId', as: 'category' });

// GearItem-ItemSpecification
db.GearItem.hasMany(db.ItemSpecification, { foreignKey: 'gearItemId', as: 'specifications' });
db.ItemSpecification.belongsTo(db.GearItem, { foreignKey: 'gearItemId', as: 'gearItem' });

// GearItem-ItemImage
db.GearItem.hasMany(db.ItemImage, { foreignKey: 'gearItemId', as: 'images' });
db.ItemImage.belongsTo(db.GearItem, { foreignKey: 'gearItemId', as: 'gearItem' });

// GearItem-MaintenanceRecord
db.GearItem.hasMany(db.MaintenanceRecord, { foreignKey: 'gearItemId', as: 'maintenanceRecords' });
db.MaintenanceRecord.belongsTo(db.GearItem, { foreignKey: 'gearItemId', as: 'gearItem' });

// GearItem-MaintenanceReminder
db.GearItem.hasMany(db.MaintenanceReminder, { foreignKey: 'gearItemId', as: 'maintenanceReminders' });
db.MaintenanceReminder.belongsTo(db.GearItem, { foreignKey: 'gearItemId', as: 'gearItem' });

// SharedAccess associations
db.User.hasMany(db.SharedAccess, { foreignKey: 'userId', as: 'sharedByMe' });
db.SharedAccess.belongsTo(db.User, { foreignKey: 'userId', as: 'owner' });

db.User.hasMany(db.SharedAccess, { foreignKey: 'sharedWithId', as: 'sharedWithMe' });
db.SharedAccess.belongsTo(db.User, { foreignKey: 'sharedWithId', as: 'sharedWith' });

db.GearItem.hasMany(db.SharedAccess, { foreignKey: 'gearItemId', as: 'sharing' });
db.SharedAccess.belongsTo(db.GearItem, { foreignKey: 'gearItemId', as: 'gearItem' });

// Add sequelize instance and Sequelize class to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;