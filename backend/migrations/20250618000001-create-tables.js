module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profile_image_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account_status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password_reset_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create gear_categories table
    await queryInterface.createTable('gear_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create gear_items table
    await queryInterface.createTable('gear_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_categories',
          key: 'id'
        },
        allowNull: false
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
      serial_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      purchase_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      current_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      condition_rating: {
        type: Sequelize.INTEGER,
        allowNull: true
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
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create item_specifications table
    await queryInterface.createTable('item_specifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      gear_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_items',
          key: 'id'
        },
        allowNull: false
      },
      spec_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spec_value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spec_unit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create item_images table
    await queryInterface.createTable('item_images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      gear_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_items',
          key: 'id'
        },
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_type: {
        type: Sequelize.ENUM('main', 'detail', 'receipt', 'warranty', 'other'),
        defaultValue: 'main'
      },
      caption: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create maintenance_records table
    await queryInterface.createTable('maintenance_records', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      gear_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_items',
          key: 'id'
        },
        allowNull: false
      },
      maintenance_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maintenance_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      performed_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      next_service_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create maintenance_reminders table
    await queryInterface.createTable('maintenance_reminders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      gear_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_items',
          key: 'id'
        },
        allowNull: false
      },
      reminder_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      frequency: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      frequency_unit: {
        type: Sequelize.ENUM('days', 'weeks', 'months', 'years'),
        allowNull: true
      },
      last_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      next_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      notification_sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create shared_access table
    await queryInterface.createTable('shared_access', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      shared_with_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      gear_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'gear_items',
          key: 'id'
        },
        allowNull: true
      },
      access_level: {
        type: Sequelize.ENUM('view', 'edit'),
        defaultValue: 'view'
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order
    await queryInterface.dropTable('shared_access');
    await queryInterface.dropTable('maintenance_reminders');
    await queryInterface.dropTable('maintenance_records');
    await queryInterface.dropTable('item_images');
    await queryInterface.dropTable('item_specifications');
    await queryInterface.dropTable('gear_items');
    await queryInterface.dropTable('gear_categories');
    await queryInterface.dropTable('users');
  }
};