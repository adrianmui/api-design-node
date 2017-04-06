var Post = require('./postModel');
var _ = require('lodash');

let postCtrl = {};

postCtrl.params = function(req, res, next, id) {
    Post.findById(id)
        .then(function(post) {
            if (!post) {
                next(new Error('No post with that id'));
            } else {
                req.post = post;
                next();
            }
        }, function(err) {
            next(err);
        });
};

postCtrl.get = function(req, res, next) {
    logger.log('postCtrl.get');
    Post.find()
        .populate('author categories')
        .exec()
        .then((Post) => {
            if (Post.length <= 0) {
                logger.log('mongoose not found');
                res.status(404).send('404 ERROR Post NOT FOUND');
            } else {
                res.send(Post);
            }
        });
};

postCtrl.getOne = function(req, res, next) {
    res.json(req.post);
};

postCtrl.put = function(req, res, next) {
    var post = req.post;
    var update = req.body;

    _.merge(post, update);

    post.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

postCtrl.post = function(req, res, next) {
    var newpost = req.body;
    console.log(newpost);
    Post.create(newpost)
        .then(function(post) {
            res.json(post);
        }, function(err) {
            next(err);
        });
};

postCtrl.delete = function(req, res, next) {
    req.post.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

module.exports = postCtrl;