import express from 'express';

/**
 *
 * @type {Router|router}
 */
const router = express.Router();


router.get('/',function (request,response) {
    response.redirect('/network');
});


export default router;