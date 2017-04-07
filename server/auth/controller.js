var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
    // req.user will be there from the middleware
    // verify user. Then we can just create a token
    // and send it back for the client to consume
    console.log('signin with token');
    let signedToken = signToken(req.user._id);

    // if (!req.query) req.query = {};
    // req.query.access_token = signedToken;
    // next();

    res.json({
        token: signedToken
    });
};