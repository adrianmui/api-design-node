const express = require('express');
const app = express();
const api = require('./api/api');

// setup the app middlware
const appMiddle = require('./middleware/appMiddlware');
const errMiddle = require('./middleware/errMiddlware');

appMiddle(app);

// setup the api
app.use('/api/', api);

// set up global error handling
app.use(errMiddle());

// export the app for testing
module.exports = app;