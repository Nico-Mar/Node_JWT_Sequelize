'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {




    await queryInterface.bulkInsert('roles', [{
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('user_role', [{
        user_id: 1,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('user_role', null, {});

  }
};