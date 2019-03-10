import express from 'express';

/**
 *
 * @type {Router|router}
 */
const router = express.Router();

import NetworkController from '../app/controllers/network-controller'

/*Use Network Controller Methods*/
const Controller = new NetworkController();

router.get('/', Controller.index);
router.get('/:id', Controller.show);
router.post('/', Controller.store);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.destory);

module.exports = router;
