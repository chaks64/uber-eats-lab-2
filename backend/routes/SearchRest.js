// "use strict"
const express = require("express");
const router = express.Router();
const { auth,checkAuth } = require("../utils/passport");
var kafka = require("../kafka/client");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/searchRest' ,(req, res) => {
    console.log("searchRest backend here",req.body);
    if (req.body.search === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("searchRest", req.body, function (err, results) {
            if(results){
                console.log("After Kafka results searchRest");
                res.status(200).end(JSON.stringify(results));
            } else{
                console.log("after kafka error searchRest",err);
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Error search');
                res.end('Error Search');
            }
          });
    }
});

module.exports = router ;