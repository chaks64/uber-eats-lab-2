"use strict"
const express = require("express");
const router = express.Router();
const { auth,checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
//const { auth, checkAuth } = require("../utils/passport");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/showReceipt' ,(req, res) => {
    console.log("Login backend here",req.body);
    if (req.body.order_id === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("showReceipt", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results show Receipt");
                res.status(200).end(JSON.stringify(results));
            } else{
                console.log("after kafka error show Receipt",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Error Order ID');
                res.end('Error Order ID');
            }
          });
    }
});

module.exports = router ;