// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('underscore');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let lions = [{
    'name': 'Simba',
    'id': 1,
    'age': 3,
    'pride': 'the cool cats',
    'gender': 'male'
}];
let id = 0;

app.get('/lions', (request, response) => {
    response.send(JSON.stringify(lions));
});

app.get('/lions/:id', (request, response) => {
    let lion = _.find(lions, (el) => {
        return (el.id == request.params.id);
    });
    response.send(JSON.stringify(lion));
});

app.post('/lions', (request, response) => {
    let fail = undefined;
    let newLion = {
        'name': '',
        'id': 0,
        'age': 0,
        'pride': '',
        'gender': ''
    };
    _.each(request.body, (val, key) => {
        (newLion[key] != undefined) ? newLion[key] = val: fail = key;
    });

    if (!fail && request._body) {
        lions.push(newLion);
    } else {
        res.status(404).send('The params: ' + fail + ' did not exist or errored');
    }
    response.send(JSON.stringify(newLion));
});

app.put('/lions/:id', (request, response) => {
    let changedLion = _.findWhere(lions, { id: request.params.id });
    if (changedLion) {
        _.each(request.body, (val, key) => {
            changedLion[key] = val;
        });
    } else {
        res.status(404).send('Lion not found');
    }
    response.send(JSON.stringify(changedLion));
})

app.delete('/lions/:id', (request, response) => {
    let lostLion = _.findWhere(lions, { id: request.params.id });
    if (lostLion) {
        lions = _.without(lions, lostLion);
    } else {
        res.status(404).send('Lion not found');
    }
    response.send(JSON.stringify(lostLion));
})

app.listen(3000);
console.log('on port 3000');