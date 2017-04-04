// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for tigers
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

const tigerRouter = require('express').Router();

let tigers = [];
let id = 0;

let updateId = (req, res, next) => {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

let roar = (req, res, next) => {
    console.log('tiger-tiger-tiger-tiger-tiger-tiger');
    next();
};

tigerRouter.all('/', roar, (req, res, next) => {
    next();
})

tigerRouter.param('id', function(req, res, next, id) {
    var todo = _.find(todos, { id: id });

    if (todo) {
        req.todo = todo;
        next();
    } else {
        res.send();
    }
});

tigerRouter.get('/', function(req, res) {
    res.send(`<pre>` + JSON.stringify(tigers, undefined, 2) + `</pre>` || {});
});

tigerRouter.get('/:id', function(req, res) {
    var tiger = req.todo;
    res.json(tiger || {});
});

tigerRouter.post('/', updateId, function(req, res) {
    var tiger = req.body;

    tigers.push(tiger);

    res.json(tiger);
});


tigerRouter.put('/:id', function(req, res) {
    var update = req.body;
    if (update.id) {
        delete update.id
    }

    var tiger = _.findIndex(tigers, { id: req.params.id });
    if (!tigers[tiger]) {
        res.send();
    } else {
        var updatedtiger = _.assign(tigers[tiger], update);
        res.json(updatedtiger);
    }
});

module.exports = tigerRouter;