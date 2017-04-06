var router = require('express').Router();
var logger = require('../../util/logger');
const postCtrl = require('./postController');
// setup boilerplate route jsut to satisfy a request
// for building

router.param('id', postCtrl.params);

router.route('/')
    .get(postCtrl.get)
    .post(postCtrl.post);

router.route('/:id')
    .get(postCtrl.getOne)
    .put(postCtrl.put)
    .delete(postCtrl.delete);

module.exports = router;