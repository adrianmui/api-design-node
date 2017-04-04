const lionRouter = require('express').Router();

let lions = [];
let id = 0;

let updateId = (req, res, next) => {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

lionRouter.param('id', function(req, res, next, id) {
    let todo = _.find(todos, { id: id });

    if (todo) {
        req.todo = todo;
        next();
    } else {
        res.send();
    }
});

lionRouter.get('/', function(req, res) {
    res.send(`<pre>` + JSON.stringify(lions, undefined, 2) + `</pre>` || {});
});

lionRouter.get('/:id', function(req, res) {
    let lion = req.todo;
    res.send(JSON.stringify(lion) || {});

});

lionRouter.post('/', updateId, function(req, res) {
    let lion = req.body;

    lions.push(lion);

    res.json(lion);
});


lionRouter.put('/:id', function(req, res) {
    let update = req.body;
    if (update.id) {
        delete update.id
    }

    let lion = _.findIndex(lions, { id: req.params.id });
    if (!lions[lion]) {
        res.send();
    } else {
        let updatedLion = _.assign(lions[lion], update);
        res.json(updatedLion);
    }
});

module.exports = lionRouter;