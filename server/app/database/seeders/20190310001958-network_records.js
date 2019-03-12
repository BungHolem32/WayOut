'use strict';
var faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronously.

          Example:
          */
        var records = [];

        for(var i=0;i<100;i++)
        {
            records[i] =  {
                id: faker.random.uuid(),
                name: faker.address.country(),
                time_created: new Date(faker.date.past()).getTime(),
                network_type: faker.random.arrayElement(['Tp-link', 'D-link','Netgear']),
                last_successful_connection: new Date(faker.date.past()).getTime()
            };
        }

        return queryInterface.bulkInsert('networks', records, {});

    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronously.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};
