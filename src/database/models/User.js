'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // hasMany
      User.hasMany(models.Post,{ as: "posts", foreignKey: "userId"});
      //belongsToMany
      User.belongsToMany(models.Role,{as:'roles',through:'user_role',foreignKey:'user_id'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [2,255],
          msg: "El nombre debe ser de 2 caracteres como mínimo"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate:{
        len: {
          args: [6,255],
          msg: "El password debe contener 6 caracteres como mínimo"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate:{
        isEmail:{
          msg: "El email debe ser del formato xxx@xxx.xxx"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  User.isAdmin = function(roles){
    let tempArray = [];
    roles.forEach(role => {
      tempArray.push(role.role);
      return tempArray.includes('admin');
    });
  };

  return User;
};