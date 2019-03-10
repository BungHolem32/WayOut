'use strict';

import NetworkModel from "../models/network";

/**
 *  Network controller for Crud Usage
 */
export default class NetworkController {

    constructor() {
        this._instance = (new NetworkModel).model;
    }

    static messages(){
        let methodToMessage = {
            'index':'index message','store':'store message','show':'show message','update':'update message','delete':'delete message',
        };



        // return methodToMessage[arguments.callee.caller.toString()]
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
        return ({statusCode,message},data) => {
            return {
                status: statusCode,
                message: message,
                data: data,
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
        console.log(request.url,request.method);
        NetworkController.messages();
        NetworkController.model.findAll()
            .then((records) => {
                response.send(NetworkController.responseObject(response, records));
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
                response.send(NetworkController.responseObject(response, record));
            })
    }

    /**
     *
     * @param request
     * @param response
     */
    store(request, response) {
        NetworkController.model
            .save()
            .then((record) => {
                response.send(NetworkController.responseObject(response, record));
            })
    }

    /**
     *
     * @param request
     * @param response
     */
    update(request, response) {
        NetworkController.model
            .update()
            .then((record) => {
                response.send(NetworkController.responseObject(response, record));
            })
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
                response.send(`record with ${id} was deleted successfully`);
            })
    }
}


