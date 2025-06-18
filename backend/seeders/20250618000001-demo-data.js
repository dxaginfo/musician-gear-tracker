const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert users
    const userId1 = uuidv4();
    const userId2 = uuidv4();
    
    await queryInterface.bulkInsert('users', [
      {
        id: userId1,
        email: 'demo@example.com',
        password_hash: bcrypt.hashSync('password123', 10),
        first_name: 'Demo',
        last_name: 'User',
        account_status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: userId2,
        email: 'jane@example.com',
        password_hash: bcrypt.hashSync('password123', 10),
        first_name: 'Jane',
        last_name: 'Doe',
        account_status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    
    // Insert gear categories
    const categoryIds = {
      electricGuitar: uuidv4(),
      acousticGuitar: uuidv4(),
      bassGuitar: uuidv4(),
      amplifier: uuidv4(),
      pedal: uuidv4(),
      accessory: uuidv4()
    };
    
    await queryInterface.bulkInsert('gear_categories', [
      {
        id: categoryIds.electricGuitar,
        name: 'Electric Guitar',
        description: 'Electric guitars and related equipment',
        icon: 'guitar_electric',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: categoryIds.acousticGuitar,
        name: 'Acoustic Guitar',
        description: 'Acoustic guitars and related equipment',
        icon: 'guitar_acoustic',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: categoryIds.bassGuitar,
        name: 'Bass Guitar',
        description: 'Bass guitars and related equipment',
        icon: 'bass_guitar',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: categoryIds.amplifier,
        name: 'Amplifier',
        description: 'Guitar and bass amplifiers',
        icon: 'amplifier',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: categoryIds.pedal,
        name: 'Effects Pedal',
        description: 'Guitar and bass effects pedals',
        icon: 'pedal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: categoryIds.accessory,
        name: 'Accessory',
        description: 'Various accessories for instruments',
        icon: 'accessory',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    
    // Insert gear items
    const gearItemIds = {
      stratocaster: uuidv4(),
      lesPaul: uuidv4(),
      jazzChorus: uuidv4(),
      taylor: uuidv4()
    };
    
    await queryInterface.bulkInsert('gear_items', [
      {
        id: gearItemIds.stratocaster,
        user_id: userId1,
        category_id: categoryIds.electricGuitar,
        name: 'Fender Stratocaster',
        brand: 'Fender',
        model: 'American Professional II',
        serial_number: 'US21123456',
        description: 'Olympic White finish with maple neck',
        purchase_date: new Date('2024-01-15'),
        purchase_price: 1599.99,
        current_value: 1450.00,
        condition_rating: 9,
        status: 'Active',
        location: 'Home Studio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: gearItemIds.lesPaul,
        user_id: userId1,
        category_id: categoryIds.electricGuitar,
        name: 'Gibson Les Paul',
        brand: 'Gibson',
        model: 'Standard 60s',
        serial_number: '123456789',
        description: 'Bourbon Burst finish with rosewood fretboard',
        purchase_date: new Date('2023-11-20'),
        purchase_price: 2499.99,
        current_value: 2300.00,
        condition_rating: 8,
        status: 'Active',
        location: 'Home Studio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: gearItemIds.jazzChorus,
        user_id: userId1,
        category_id: categoryIds.amplifier,
        name: 'Roland Jazz Chorus',
        brand: 'Roland',
        model: 'JC-40',
        serial_number: 'Z1234567',
        description: '40W stereo clean amp with chorus',
        purchase_date: new Date('2024-03-05'),
        purchase_price: 799.99,
        current_value: 750.00,
        condition_rating: 9,
        status: 'In Repair',
        location: 'Repair Shop',
        notes: 'Sent for routine maintenance and cleaning',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: gearItemIds.taylor,
        user_id: userId1,
        category_id: categoryIds.acousticGuitar,
        name: 'Taylor 814ce',
        brand: 'Taylor',
        model: '814ce V-Class',
        serial_number: '1234567890',
        description: 'Grand Auditorium acoustic-electric with V-Class bracing',
        purchase_date: new Date('2023-08-12'),
        purchase_price: 3499.99,
        current_value: 3200.00,
        condition_rating: 9,
        status: 'Active',
        location: 'Home Studio',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    
    // Insert specifications
    await queryInterface.bulkInsert('item_specifications', [
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.stratocaster,
        spec_name: 'Body Wood',
        spec_value: 'Alder',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.stratocaster,
        spec_name: 'Neck Wood',
        spec_value: 'Maple',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.stratocaster,
        spec_name: 'Fingerboard Radius',
        spec_value: '9.5',
        spec_unit: 'inches',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.lesPaul,
        spec_name: 'Body Wood',
        spec_value: 'Mahogany with Maple top',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.lesPaul,
        spec_name: 'Neck Wood',
        spec_value: 'Mahogany',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.taylor,
        spec_name: 'Top Wood',
        spec_value: 'Sitka Spruce',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.taylor,
        spec_name: 'Back and Sides',
        spec_value: 'Indian Rosewood',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.jazzChorus,
        spec_name: 'Power Output',
        spec_value: '40',
        spec_unit: 'watts',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.jazzChorus,
        spec_name: 'Speaker Configuration',
        spec_value: '2x10',
        spec_unit: 'inch',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    
    // Insert maintenance records
    await queryInterface.bulkInsert('maintenance_records', [
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.stratocaster,
        maintenance_type: 'Setup',
        maintenance_date: new Date('2024-03-15'),
        performed_by: 'Guitar Center',
        cost: 75.00,
        description: 'Full setup with new strings and fretboard cleaning',
        next_service_date: new Date('2024-09-15'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.lesPaul,
        maintenance_type: 'String Change',
        maintenance_date: new Date('2024-04-20'),
        performed_by: 'Self',
        cost: 12.99,
        description: 'Replaced with Ernie Ball Regular Slinky strings',
        next_service_date: new Date('2024-07-20'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.taylor,
        maintenance_type: 'Humidity Check',
        maintenance_date: new Date('2024-05-01'),
        performed_by: 'Self',
        description: 'Checked and adjusted humidifier in case',
        next_service_date: new Date('2024-06-01'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    
    // Insert maintenance reminders
    await queryInterface.bulkInsert('maintenance_reminders', [
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.stratocaster,
        reminder_type: 'String Change',
        frequency: 3,
        frequency_unit: 'months',
        last_date: new Date('2024-03-15'),
        next_date: new Date('2024-06-15'),
        notification_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.lesPaul,
        reminder_type: 'String Change',
        frequency: 3,
        frequency_unit: 'months',
        last_date: new Date('2024-04-20'),
        next_date: new Date('2024-07-20'),
        notification_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.taylor,
        reminder_type: 'Humidity Check',
        frequency: 1,
        frequency_unit: 'months',
        last_date: new Date('2024-05-01'),
        next_date: new Date('2024-06-01'),
        notification_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.taylor,
        reminder_type: 'Full Setup',
        frequency: 12,
        frequency_unit: 'months',
        last_date: new Date('2023-12-15'),
        next_date: new Date('2024-12-15'),
        notification_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        gear_item_id: gearItemIds.jazzChorus,
        reminder_type: 'Tube Replacement',
        frequency: 24,
        frequency_unit: 'months',
        last_date: new Date('2023-06-10'),
        next_date: new Date('2025-06-10'),
        notification_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete data in reverse order
    await queryInterface.bulkDelete('maintenance_reminders', null, {});
    await queryInterface.bulkDelete('maintenance_records', null, {});
    await queryInterface.bulkDelete('item_specifications', null, {});
    await queryInterface.bulkDelete('item_images', null, {});
    await queryInterface.bulkDelete('gear_items', null, {});
    await queryInterface.bulkDelete('gear_categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};