'use strict';

import NetworkModel from "../models/network";

/**
 *  Network controller for Crud Usage
 */
export default class NetworkController {


    constructor() {
        this._instance = (new NetworkModel).model;
    }

    /**
     *
     * @returns {*}
     */
    static get model() {
        if (!this._instance) {
            this._instance = (new NetworkModel).model;
        }

        return this._instance;
    }

    /**
     *
     * @returns {function({statusCode?: *, message?: *}, *=): {data: *, message: *, status: *}}
     */
    static get responseObject() {
        return ({message,statusCode,data}) => {
            return {
                status: statusCode,
                message,
                data,
            }
        }
    }

    /**
     * Get all Network List
     *
     * @param request
     * @param response
     */
    index(request, response) {
        NetworkController.model.findAll()
            .then((records) => {
                response.message = 'get all network list from db';
                response.data = records;
                response.send(NetworkController.responseObject(response));
            })
            .catch((err)=> {
                response.message = err;
                response.data = null;
                response.send(NetworkController.response)
            });
    }

    /**
     * Get Specific network
     *
     * @param request
     * @param response
     */
    show(request, response) {
        NetworkController.model
            .findById(request.params.id)
            .then((record) => {
                response.message =  `Get record with the id of ` + request.params.id;
                response.data = record;
                response.send(NetworkController.responseObject(response));
            })
            .catch((err)=> {
                response.message = err;
                response.data = null;
                response.send(NetworkController.response)
            });
    }

    /**
     *
     * @param request
     * @param response
     */
    save(request, response) {
        NetworkController.model
            .save()
            .then((record) => {
                response.message =  `Get record with the id of ` + request.params.id;
                response.data = record;
                response.send(NetworkController.responseObject(response));
            })
            .catch((err)=> {
                response.message = err;
                response.data = null;
                response.send(NetworkController.response)
            });
    }

    /**
     *
     * @param request
     * @param response
     */
    update(request, response) {
        const id = request.params.id;
        let updates = request.body;

        NetworkController.model
            .findById(id)
            .then((model) => {
                return model.update(updates);
            })
            .then(record =>{
                response.data = record;
                response.message = `record with the id of ${id} updated successfully`;
                response.send(NetworkController.responseObject(response))
            })
            .catch((err)=> {
                response.message = err;
                response.data = null;
                response.send(NetworkController.response)
            });

    }

    /**
     *
     * @param request
     * @param response
     */
    destory(request, response) {
        const id = request.params.id;
        NetworkController.model
            .destroy({where: {id: id}})
            .then(() => {
                response.data = null;
                response.message = `record with the id of ${id} updated successfully`;
                response.send(NetworkController.responseObject(response));
            })
            .catch((err)=> {
                response.message = err;
                response.data = null;
                response.send(NetworkController.response)
            });
    }
}


