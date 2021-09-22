'use strict';

const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../controllers/config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([

      User.create({
        name: "Nico",
        email: "nico@nico.com",
        password: bcrypt.hashSync("123456", Number.parseInt(authConfig.rounds)),
        posts:[
          {
            title: "Título 1",
            body: "Acá va el mensaje del post 1."
          },
          {
            title: "Título 2",
            body: "Acá va el mensaje del post 2."
          }
        ]
      },{include: "posts"}),
      
      User.create({
        name: "Juana",
        email: "juana@juana.com",
        password: bcrypt.hashSync("123456", Number.parseInt(authConfig.rounds)),
        posts:[
          {
            title: "Título 3",
            body: "Acá va el mensaje del post 3."
          },
          {
            title: "Título 4",
            body: "Acá va el mensaje del post 4."
          }
        ]
      },{include: "posts"}),

    ]);

  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.bulkDelete('posts', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ]);    
  }
};
