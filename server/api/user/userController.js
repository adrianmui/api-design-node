const User = require('./userModel');
const _ = require('lodash');

let userCtrl = {};

userCtrl.params = function(req, res, next, id) {
    User.findById(id)
        .then(function(user) {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user;
                next();
            }
        }, function(err) {
            next(err);
        });
};

userCtrl.get = function(req, res, next) {
    User.find({})
        .then(function(users) {
            res.json(users);
        }, function(err) {
            next(err);
        });
};

userCtrl.getOne = function(req, res, next) {
    logger.log('userCtrl.getOne');
    res.json(res.category);
};

userCtrl.put = function(req, res, next) {
    var user = req.user;

    var update = req.body;

    _.merge(user, update);

    user.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

userCtrl.post = function(req, res, next) {
    var newUser = req.body;

    User.create(newUser)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            next(err);
        });
};

userCtrl.delete = function(req, res, next) {
    req.user.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

module.exports = userCtrl;