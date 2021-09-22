'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //belongsToMany
      Role.belongsToMany(models.User,{as:'users',through:'user_role',foreignKey:'role_id'});
    }
  };
  Role.init({
    role:{
        type: DataTypes.STRING,
        allowNull : false,
      }
    }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
  });
  return Role;
};