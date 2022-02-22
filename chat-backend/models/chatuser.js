'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatUser = sequelize.define('ChatUser', {
    chatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  ChatUser.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Chat, {foreignKey: 'chatId'});
    this.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return ChatUser;
};