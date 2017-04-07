const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const auth = require('../../auth/auth');
let checkUser = [auth.decodeToken(), auth.getFreshUser()];

// lock down the right routes :)
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/me')
    .get(checkUser, controller.me);

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;