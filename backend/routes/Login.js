// "use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const { secret } = require('../Utils/config');
const Users = require('../Models/UserModel');
const { auth } = require("../utils/passport");
auth();

var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post('/login', (req, res) => {
    console.log("Login backend here");
    if (req.body.username === "" || req.body.password === "") {
        res.status(400).json({ msg: "All fields required" });
    }
    else {
        kafka.make_request("login", req.body, function (err, results) {
            if (err) {
                console.log("Inside err");
                res.json({
                  status: "error",
                  msg: "System Error, Try Again.",
                });
              } else {
                console.log("Inside router post");
                console.log(results);
                res.status(200).send(results);
              }
            });
          }
      });

            // if (err) {
            //   console.log("Inside err");
            //   res.json({
            //     status: "error",
            //     msg: "System Error, Try Again.",
            //   });
            // } else {
            //   console.log("Inside router post");
            //   console.log(results);
            //   res.status(200).send(results);
            // }

//     Users.findOne({ username: req.body.username, password: req.body.password }, (error, users) => {
//         if (error) {
//             res.status(500).end("Error Occured");
//         }
//         if (users) {
//             const payload = { _id: users._id, username: users.username};  
//             const token = jwt.sign(payload, secret, {
//                 expiresIn: 1008000
//             });
            
//             let send = {
//                 user :users.username,
//                 type : users.usertype,
//                 token :"JWT "+token
//             }
//             console.log(send);
//             res.status(200).end(JSON.stringify(send));
//         }
//         else {
//             res.status(401).end("Invalid Credentials");
//         }
//     });
// });

module.exports = router;