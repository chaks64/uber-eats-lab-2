// "use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
// const { auth } = require(".././Utils/passport");
// auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/restProfile' ,(req, res) => {
    console.log("rest get backend here",req.body);
    if (req.body.username === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("restProfile", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results rest profile");
                res.status(200).end(JSON.stringify(results));
            } else{
                console.log("after kafka error rest profile",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid rest');
                res.end('Invalid rest!');
            }
          });
    }
});

module.exports = router ;