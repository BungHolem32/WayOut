const fs = require('fs');

module.exports = {
    development: {
        username: 'ilan',
        password: 'ilan',
        database: 'wayout_networks',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: 'database_test',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: 'ilan',
        password: 'ilan',
        database: 'wayout_networks',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};