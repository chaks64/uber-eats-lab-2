"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
const { auth } = require(".././Utils/passport");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/updatecust', (req, res) => {
    console.log("Login backend here",req.body);
    if (req.body.username === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("updatecust", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results update cust profile");
                res.status(200).end(JSON.stringify(results));
            } else{
                console.log("after kafka error login",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid update');
                res.end('Invalid update!');
            }
          });
    }
});

module.exports = router ;