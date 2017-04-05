// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root

// adrian: add appRoot pathfile for clarity when importing modules
const path = require('path');
global.appRoot = path.resolve(__dirname);

// setup config first before anything by requiring it
const config = require('./server/config/config');
const app = require('./server/server');

// logger is a wrapper around console.log that adds color,
// logs objects as json and can be conditionally turned off
// so you don't have to erase all calls to it
const logger = require('./server/util/logger');

app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);