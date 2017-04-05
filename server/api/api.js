const router = require('express').Router();
const users = require('./user/userRoutes');
const categories = require('./category/categoryRoutes');
const posts = require('./post/postRoutes');
const logger = require(appRoot + '/server/util/logger');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

logger.log('okay');

router.use('/users', users /* require the router*/ );
router.use('/categories', categories /* require the router*/ );
router.use('/posts', posts /* require the router*/ );

router
    .route('/')
    .get((req, res, next) => {
        logger.log('suh root');
        // res.send(`<h1> ADRIAN ZONE </h1>`);
        next(new Error('testing ADRIAN error!'));
    });

module.exports = router;