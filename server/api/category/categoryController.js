const Category = require('./categoryModel');
const _ = require('lodash');

let categoryController = {};

categoryController.params = (req, res, next, id) => {
    console.log('id: ', id);
    // use the id and attach the category to req
    Category.findById(id)
        .then((category) => {
            req.category = category;
            next();
        }, (err) => {
            res.send('404', err.message);
        });
};

categoryController.get = (req, res, next) => {
    console.log('categoryController.get');
    Category.find().then((category) => {
        if (category.length <= 0) {
            console.log('mongoose not found');
            res.status(404).send('404 ERROR CATEGORY NOT FOUND');
        } else {
            res.send(category);
        }
    });
};

categoryController.getOne = (req, res, next) => {
    console.log('categoryController.getOne');
    res.json(res.category);
};

categoryController.put = (req, res, next) => {
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

categoryController.post = (req, res, next) => {
    let newcategory = req.body;
    let a = JSON.stringify(req.body);

    Category.create(newcategory)
        .then((category) => {
            res.json(category);
        }, (err) => {
            res.send(404, err);
        });
};

categoryController.delete = (req, res, next) => {
    req.category.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

module.exports = categoryController;