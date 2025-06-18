module.exports = (sequelize, Sequelize) => {
  const GearItem = sequelize.define('GearItem', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    categoryId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'GearCategories',
        key: 'id'
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    brand: {
      type: Sequelize.STRING,
      allowNull: true
    },
    model: {
      type: Sequelize.STRING,
      allowNull: true
    },
    serialNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    purchaseDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    purchasePrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    currentValue: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    conditionRating: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      }
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive', 'In Repair', 'Borrowed', 'Lent Out'),
      defaultValue: 'Active'
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'gear_items',
    timestamps: true,
    underscored: true
  });

  return GearItem;
};