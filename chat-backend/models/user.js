'use strict';
const bcrypt = require('bcrypt');
const config = require('../config/app');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      get() {
        const avatar = this.getDataValue('avatar');
        const url = `${config.appUrl}:${config.appPort}`;

        if(!avatar) {
          return `${url}/${this.getDataValue('gender')}.svg`
        }

        const id = this.getDataValue('id');
        return `${url}/user/${id}/${avatar}`

      }
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Chat, {through: 'ChatUser', foreignKey: 'userId'});
    this.hasMany(models.ChatUser, {foreignKey: 'userId'});
  };
  return User;
};

const hashPassword = async (user) => {
  if(user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  return user;
}