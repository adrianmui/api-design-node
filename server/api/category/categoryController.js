const Category = require('./categoryModel');
const _ = require('lodash');

let categoryCtrl = {};

categoryCtrl.params = (req, res, next, id) => {
    // use the id and attach the category to req
    Category.findById(id)
        .then((category) => {
            req.category = category;
            next();
        }, (err) => {
            res.send('404', err.message);
        });
};

categoryCtrl.get = (req, res, next) => {
    logger.log('categoryCtrl.get');
    Category.find().then((category) => {
        if (category.length <= 0) {
            logger.log('mongoose not found');
            res.status(404).send('404 ERROR CATEGORY NOT FOUND');
        } else {
            res.send(category);
        }
    });
};

categoryCtrl.getOne = (req, res, next) => {
    logger.log('categoryCtrl.getOne');
    res.json(res.category);
};

categoryCtrl.put = (req, res, next) => {
    let category = req.category;
    let update = req.body;

    _.merge(category, update);

    category.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

categoryCtrl.post = (req, res, next) => {
    let newcategory = req.body;

    Category.create(newcategory)
        .then((category) => {
            res.json(category);
        }, (err) => {
            res.send(404, err);
        });
};

categoryCtrl.delete = (req, res, next) => {
    req.category.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

module.exports = categoryCtrl;