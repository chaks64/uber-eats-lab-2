"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const Users = require('../Models/UserModel');
var kafka = require("../../kafka/client");
var bcrypt = require("bcryptjs");
const { auth } = require("../../config/passport");
auth();


console.log("here after index");
router.post('/register', (req, res) => {

    if (
        req.body.username.length == 0 ||
        req.body.password.length == 0
      ) {
        res.status(400).json({ msg: "All fields required" });
    }
    else{
        console.log(req.body);
        var newuser = new Users({
            username : req.body.username,
            password : req.body.password,
            fname : req.body.fname,
            lname : req.body.lname,
            usertype : req.body.usertype,
            restname : req.body.restname,
            add1 : req.body.add1,
            city : req.body.city,
            state : req.body.state,
            add2 : req.body.add2,
            pincode : req.body.pincode,
            resttype : req.body.resttype,               

        });
        console.log("here for registration");
        Users.findOne({ username : req.body.username }, (error, user) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end();
            }
            if (user) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("User ID already exists");
            }
            else {
                newuser.save((error, data) => {
                    if (error) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        })
                        res.end();
                    }
                    else {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end();
                    }
                });
            }
        });
    }
});

module.exports = router ;