const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const auth = require("../config/passport")();
const jwtConfig = require('../config/jwt');
const common_helper = require("../helpers/common-helper")();

/**
 * Create an user
 */
exports.register = function (req, res) {
    var user = new User(),
        email = req.body.email,
        password = req.body.password;

    user.email = email;
    user.username = common_helper.getUsernameFromEmail(email);
    user.name = common_helper.getNameFromUsername(user.username);
    user.setPassword(password);

    user.save(function(err, user) {
        if (err) {
            res.send({
                success  : false,
                message : 'Failed to create user'
            });
        } else {
            res.send({
                success  : true,
                message : 'User created Successfully'
            });
        }
    });
};

/**
 * Authenticate user
 */
exports.authenticate = function (req, res) {
    var username = req.body.username,
        password = req.body.password,
        query = {username : username};

    User.findOne(query, function(err, user) {
        if (err) {
            res.send({
                success : false,
                message : 'Invalid User'
            });
        }

        if (user) {
            if (user.comparePassword(password, user.password)) {
                const token = jwt.sign({data : user}, jwtConfig.jwtSecret, {
                    expiresIn: 604800  /* 1 week */
                });

                res.send({
                    success : true,
                    token : token,
                    user : {
                        id : user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                });
            } else {
                res.send({
                    success : false,
                    message : 'Invalid password'
                });
            }
        } else {
            res.send({
                success : false,
                message : 'Invalid User'
            });
        }
    });
};

/**
 * Get User Profile
 */
exports.profile = function (req, res) {
    res.send({
        'id' : req.user.id,
        'username' : req.user.username,
        'name' : req.user.name,
        'email' : req.user.email
    });
};