// "use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
const { auth } = require(".././Utils/passport");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/editMenu', (req, res) => {
    console.log("Edit menu backend here",req.body);
    if (req.body.rest_id === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("editMenu", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results edit menu");
                
                    res.status(200).end(JSON.stringify(results));
                
            } else{
                console.log("after kafka error edit menu",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Error  Rest ID/Item ID');
                res.end('Error Rest ID/Item ID');
            }
          });
    }
});

module.exports = router ;