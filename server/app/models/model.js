'use strict';
import Database from "./database";

export default class Model extends Database {
    constructor(){
        super();
        this.model = this.createModel(this.modelName,this.att);
        this.syncDb();
    }

    /**
     *
     * @returns {string}
     */
    get table(){
        return '';
    }

    /**
     *
     * @returns {*}
     */
    get modelName(){
        return Model.toSingular(this.table);
    }

    get att(){
        return {};
    }

    /* Create Table */
     createModel(name, attributes) {
         return this.sequalize.define(name, attributes, {createdAt: false, updatedAt: false});
    }

    /**
     *
     * @param table
     * @returns {string}
     */
    static toSingular(table) {
        return table.replace(/s$/,'').replace(/ies$/,'')
    }

    syncDb() {
        this.sequalize.sync().then(()=>{
            console.log('Database & table created');
        })
    }
}
