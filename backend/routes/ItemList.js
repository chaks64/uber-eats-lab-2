"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const { secret } = require('../Utils/config');
const Users = require('../Models/UserModel');
const { auth, checkAuth } = require("../utils/passport");
//auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/itemlist',checkAuth ,(req, res) => {
    console.log("Login backend here",req.body);
    if (req.body.rest_id === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("itemlist", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results itemlist");
                res.status(200).end(JSON.stringify(results));
            } else{
                console.log("after kafka error login",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Rest Id');
                res.end('Invalid Rest Id!');
            }
          });
    }
});

module.exports = router ;