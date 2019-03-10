'use strict';

export default class Repository {

    /**
     *
     * @param Model
     */
    constructor(Model) {
        this.Model = Model;
    }

    async getModel(){
        return this.Model;
    }

    async all(){
        return this.Model.all();
    }

    get(){
        return
    }
    set(){
    }
}