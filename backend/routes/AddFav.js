// "use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
const { auth } = require(".././Utils/passport");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/addFav', (req, res) => {
    console.log("Login backend here",req.body);
    if (req.body.username === "" || req.body.rest_id === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("addFav", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results add fav");
                if(results === "Already added to Fav"){
                    res.status(201).end("Already added");
                } else{
                    res.status(200).end(JSON.stringify(results));
                }
            } else{
                console.log("after kafka error login",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Error  Rest ID');
                res.end('Error Rest ID');
            }
          });
    }
});

module.exports = router ;