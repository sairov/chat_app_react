'use strict';
const config = require('../config/app');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    type: DataTypes.STRING,
    message:{
      type: DataTypes.TEXT,
      get() {
        const type = this.getDataValue('type');
        const id = this.getDataValue('chatId');
        const content = this.getDataValue('message');

        return type === 'text' ? content : `${config.appUrl}:${config.appPort}/chat/${id}/${content}`;
      }
    },
    chatId: DataTypes.INTEGER,
    fromUserId: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Chat, {foreignKey: 'chatId'});
    this.belongsTo(models.User, {foreignKey: 'fromUserId'});
  };
  return Message;
};