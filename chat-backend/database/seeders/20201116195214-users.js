'use strict';

const bcrypt = require('bcrypt'); 

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

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: bcrypt.hashSync('secret', 10),
        gender: 'male'
      },
      {
        firstName: 'Susan',
        lastName: 'Love',
        email: 'susanlove@example.com',
        password: 'lovely',
        gender: 'female'
      },
      {
        firstName: 'Kyle',
        lastName: 'Great',
        email: 'kylegreat@example.com',
        password: 'awesome',
        gender: 'male'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   await queryInterface.bulkDelete('Users', null, {});
  }
};
