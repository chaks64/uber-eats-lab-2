var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let User = require("../../models/userModel");

async function handle_request(msg, callback) {
  console.log("Inside signup kafka backend");
  console.log(msg);

  let username = msg.username;
  let password = await bcrypt.hash(msg.password, 10);

  const newUser = new User({
    username,
    password
  });
  User.findOne({ username: msg.username }, (err, result) => {
    if (result) {
      console.log("found");
      console.log(result);
      callback(null, "Already exists");
    } else {
      newUser.save((err, result) => {
        if (err) {
           // res.status(500).send();
          callback(null,"Server error please check")
        } else {
          callback(null,result);

            // res.writeHead(200, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end();
        }
      });
    }
  });


// var newuser = new Users({
        //     username : req.body.username,
        //     password : req.body.password,
        //     fname : req.body.fname,
        //     lname : req.body.lname,
        //     usertype : req.body.usertype,
        //     restname : req.body.restname,
        //     add1 : req.body.add1,
        //     city : req.body.city,
        //     state : req.body.state,
        //     add2 : req.body.add2,
        //     pincode : req.body.pincode,
        //     resttype : req.body.resttype,               

        // });
        // console.log("here for registration");
        // Users.findOne({ username : req.body.username }, (error, user) => {
        //     if (error) {
        //         res.writeHead(500, {
        //             'Content-Type': 'text/plain'
        //         })
        //         res.end();
        //     }
        //     if (user) {
        //         res.writeHead(400, {
        //             'Content-Type': 'text/plain'
        //         })
        //         res.end("User ID already exists");
        //     }
        //     else {
        //         newuser.save((error, data) => {
        //             if (error) {
        //                 res.writeHead(500, {
        //                     'Content-Type': 'text/plain'
        //                 })
        //                 res.end();
        //             }
        //             else {
        //                 res.writeHead(200, {
        //                     'Content-Type': 'text/plain'
        //                 })
        //                 res.end();
        //             }
        //         });
        //     }
        // });

  console.log("after callback");
}

exports.handle_request = handle_request;
