'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    type: DataTypes.STRING
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.User, {through: 'ChatUser', foreignKey: 'chatId'});
    this.hasMany(models.ChatUser, {foreignKey: 'chatId'});
    this.hasMany(models.Message, {foreignKey: 'chatId'});
  };
  return Chat;
};