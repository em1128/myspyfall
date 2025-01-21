const Location = sequelize.define('Location', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    timestamps: false
  });
  
  module.exports = Location;
  