module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profileImageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    accountStatus: {
      type: Sequelize.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: true
    },
    passwordResetToken: {
      type: Sequelize.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User;
};