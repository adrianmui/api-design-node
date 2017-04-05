const tigerRouter = require('express').Router();
const _ = require('lodash');

let tigers = [];
let id = 0;

let updateId = function(req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

tigerRouter.param('id', function(req, res, next, id) {
    let tiger = _.find(tigers, { id: id });

    if (tiger) {
        req.tiger = tiger;
        next();
    } else {
        res.send();
    }
});

tigerRouter.route('/')
    .get((req, res) => {
        res.json(tigers);
    })
    .post(updateId, (req, res) => {
        let tiger = req.body;
        tigers.push(tiger);
        res.json(tiger);
    });

tigerRouter.route('/:id')
    .get((req, res) => {
        let tiger = req.tiger;
        res.json(tiger || {});
    })
    .put((req, res) => {
        let update = req.body;
        if (update.id) {
            delete update.id
        }

        let tiger = _.findIndex(tigers, { id: req.params.id });
        if (!tigers[tiger]) {
            res.send();
        } else {
            let updatedtiger = _.assign(tigers[tiger], update);
            res.json(updatedtiger);
        }
    })
    .delete((req, res) => {
        tigers = _.without(tigers, req.tiger);
        res.json(req.tiger);
    });

module.exports = tigerRouter;