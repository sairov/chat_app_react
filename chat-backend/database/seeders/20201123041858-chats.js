'use strict';

const models = require('../../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      const users = await User.findAll({ limit: 2 });
      const chat = await Chat.create();

      await ChatUser.bulkCreate([
        {
          chatId: chat.id,
          userId: users[0].id
        },
        {
          chatId: chat.id,
          userId: users[1].id
        }
      ]);

        await Message.bulkCreate([
          {
            message: 'Hello friend 1',
            chatId: chat.id,
            fromUserId: users[0].id
          },
          {
            message: 'Hi buddy',
            chatId: chat.id,
            fromUserId: users[1].id
          },
          {
            message: 'Long time no speak',
            chatId: chat.id,
            fromUserId: users[1].id
          }
        ]);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
