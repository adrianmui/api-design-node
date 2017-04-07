const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./postController');
const auth = require('../../auth/auth');

let checkUser = [auth.decodeToken(), auth.getFreshUser()];

// lock down the right routes :)
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(checkUser, controller.post);

router.route('/:id')
    .get(checkUser, controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete)

module.exports = router;