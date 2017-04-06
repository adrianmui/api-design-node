var router = require('express').Router();


const userCtrl = require('./userController');
// setup boilerplate route jsut to satisfy a request
// for building

router.param('id', userCtrl.params);

router.route('/')
    .get(userCtrl.get)
    .post(userCtrl.post);

router.route('/:id')
    .get(userCtrl.getOne)
    .put(userCtrl.put)
    .delete(userCtrl.delete);

module.exports = router;