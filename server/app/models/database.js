'use strict';
import Sequelize from 'sequelize';

const debug = require('debug')('Database:connection');


export default class Database {
    constructor() {
        this.connect();
    }

    connect() {
        this.Sequalize = Sequelize;
        this.sequalize = new Sequelize(Database.name, Database.user, Database.password,
            {
                operatorsAliases: false,
                host: Database.host, dialect: Database.dialect,
                pool: {
                    max: 100,
                    min: 0,
                    idle: 200000,
                    acquire: 200000,
                },
            }
        );

        this.sequalize.authenticate()
            .then(() => {
                debug('Connection has been established successfully.');

            }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    /**
     *
     * @returns {string | string}
     */
    static get user() {
        return process.env.WAY_OUT_USER_NAME;
    }

    /**
     *
     * @returns {string | string}
     */
    static get password() {
        return process.env.WAY_OUT_PASSWORD;
    }

    /**
     *
     * @returns {string | string}
     */
    static get host() {
        return process.env.WAY_OUT_HOST;
    }

    /**
     *
     * @returns {string | string}
     */
    static get port() {
        return process.env.WAY_OUT_DATABASE_PORT;
    }

    static get name() {
        return process.env.WAY_OUT_DATABASE_NAME;
    }

    static get dialect() {
        return process.env.WAY_OUT_DIALECT
    }

    static get table() {
        return 'table'
    }


}