const router = require('express').Router();

const routerAuth = require('./auth');

const auth = require('../middlewares/auth');

router.use(routerAuth);

module.exports = router;
