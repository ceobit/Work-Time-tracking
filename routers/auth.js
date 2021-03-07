const router = require("express").Router();
const { celebrate } = require("celebrate");
const { login, createUser } = require("../controllers/users");
const { accountSignIn, accountSignUp } = require("../models/validations");

router.post("/api/signin", celebrate(accountSignIn), login);
router.post("/api/signup", celebrate(accountSignUp), createUser);

module.exports = router;
