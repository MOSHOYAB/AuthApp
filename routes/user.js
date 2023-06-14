const express = require("express");
const router = express.Router();

const {login, signup,Edit,welcome} = require("../Controllers/Auth");
const {test} = require('../Controllers/test');

router.post("/login", login);
router.post("/signup", signup);
router.put("/edit",Edit);
router.get("/welcome",welcome);
router.post('/submit-test',test);


module.exports = router;