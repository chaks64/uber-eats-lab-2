"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const { secret } = require('../Utils/config');
const Users = require('../Models/UserModel');
const { auth } = require("../utils/passport");
auth();

var kafka = require("../../kafka/client");

//Route to handle Post Request Call
router.post('/login', (req, res) => {
    console.log("abc");
    Users.findOne({ username: req.body.username, password: req.body.password }, (error, users) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (users) {
            const payload = { _id: users._id, username: users.username};  
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            
            let send = {
                user :users.username,
                type : users.usertype,
                token :"JWT "+token
            }
            console.log(send);
            res.status(200).end(JSON.stringify(send));
        }
        else {
            res.status(401).end("Invalid Credentials");
        }
    });
});

module.exports = router;