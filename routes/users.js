const express = require('express');
const router = express.Router();
const auth = require("../config/passport")();

const user_controller = require("../controllers/user.controller");

// Register
router.route('/register')
    .post(user_controller.register);

// Authenticate
router.route('/authenticate')
    .post(user_controller.authenticate);

// Profile
router.route('/profile')
    .get(auth.authenticate(), user_controller.profile);

module.exports = router;