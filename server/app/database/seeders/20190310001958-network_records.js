'use strict';
var faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
        var records = [];

        for(var i=0;i<100;i++)
        {
            records[i] =  {
                id: faker.random.uuid(),
                name: faker.address.country(),
                time_created: faker.date.past(),
                network_type: faker.random.arrayElement(['Tp-link', 'D-link','Netgear']),
                last_successful_connection: faker.date.past()
            };
        }

        return queryInterface.bulkInsert('networks', records, {});

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
