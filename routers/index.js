const router = require('express').Router();

const routerAuth = require('./auth');
const routerDateRecord = require('./dateRecord');

const auth = require('../middlewares/auth');

router.use(routerAuth);
router.use(auth, routerDateRecord);

module.exports = router;
