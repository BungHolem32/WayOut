const fs = require('fs');

module.exports = {
    development: {
        username: 'ilan',
        password: 'ilan',
        database: 'wayout_networks',
        host: '127.0.0.1',
        dialect: 'mysql',
        port:'3306',
    },
    test: {
        username: 'ilan',
        password: 'ilan',
        database: 'way_out_networks',
        host: '127.0.0.1',
        dialect: 'mysql',
        port:'3306'
    },
    production: {
        username: 'ilan',
        password: 'ilan',
        database: 'wayout_networks',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};