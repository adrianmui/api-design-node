// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware  to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');

let lions = [];
let id = 0;

// middleware
let updateId = (req, res, next) => {
    // fill this out. this is the route middleware for the ids
    req.body.id = id;
    id++;
    next();
};

let checkAuth = (req, res, next) => {
    console.log('CHECKING AUTH..');
    next();
};

let logErr = (err, req, res, next) => {
    console.log('There is an error here: ', err);
    res.status(500).send(err);
};

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.param('id', (req, res, next, id) => {
    // fill this out to find the lion based off the id
    // and attach it to req.lion. Rember to call next()
    let lion = _.find(lions, (el) => { return el.id == id });
    if (lion) {
        req.lion = lion;
        next();
    } else {
        next(new Error('Lion not found'));
    }
});


app.all('/lions', checkAuth, (req, res, next) => {
    console.log('PRETTY MUCH BACKEND UI.ROUTER RESOLVE AMIRITE');
    next();
});

app.get('/lions', (req, res, next) => {
    res.json(lions);
    // next(new Error('common error'));
});

app.get('/lions/:id', (req, res) => {
    // use req.lion
    res.json(req.lion || {});
});

app.post('/lions', updateId, (req, res) => {
    console.log(req.body);
    var lion = req.body;

    lions.push(lion);

    res.json(lion);
});


app.put('/lions/:id', (req, res) => {
    var update = req.body;
    if (update.id) {
        delete update.id
    }

    var lion = _.findIndex(lions, { id: req.params.id });
    if (!lions[lion]) {
        res.send();
    } else {
        var updatedLion = _.assign(lions[lion], update);
        res.json(updatedLion);
    }
});

app.use(logErr);

app.listen(3000);
console.log('on port 3000');