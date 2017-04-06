const router = require('express').Router();
const logger = require('../../util/logger');
const categoryCtrl = require('./categoryController');
// setup boilerplate route jsut to satisfy a request
// for building

router.param('id', categoryCtrl.params);

router.route('/')
    .get(categoryCtrl.get)
    .post(categoryCtrl.post);

router.route('/:id')
    .get(categoryCtrl.getOne)
    .put(categoryCtrl.put)
    .delete(categoryCtrl.delete);

module.exports = router;