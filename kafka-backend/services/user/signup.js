var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let Cust = require("../../models/custModel");
const Rest = require("../../models/restModel");
let User = require("../../models/userModel");


async function handle_request(msg, callback) {
  console.log("Inside signup kafka backend");
  console.log(msg);

  let username = msg.username;
  let password = await bcrypt.hash(msg.password, 10);
  let usertype = msg.usertype;
  let fname = msg.fname;
  let lname = msg.lname;
  let restname = msg.restname;
  let add1 = msg.add1;
  let add2 = msg.add2;
  let city = msg.city;
  let state = msg.state;
  let pincode = msg.pincode;
  let resttype = msg.resttype;

  console.log("@@@@@@@@@@@@@@@@@@",msg);
  const newUser = new User({
    username,
    password,
    usertype
  });

  const newCust = new Cust({
    username,
    fname,
    lname
  });

  const newRest = new Rest({
    username,
    restname,
    add1,
    add2,
    city,
    state,
    pincode,
    resttype
  })

  User.findOne({ username: msg.username }, (err, result) => {
    if (result) {
      console.log("found");
      console.log(result);
      callback(null, "Already exists");
    } else {
      newUser.save((err, result) => {
        if (err) {
           // res.status(500).send();
          console.log(err);
          callback(null,"Server error please check")
        } else {

          //customer or rest add based on cust type
          if(usertype === "cust"){
            console.log("cust here",fname);
            newCust.save((err, res) => {
              if (err) {
                console.log(err);
                callback(null,"Cust error please check")
              } else {
                callback(null,res);
              }
            });
          } 

          //rest here
          else{
            console.log("rest here");
            newRest.save((err, res) => {
              if (err) {
                console.log(err);
                callback(null,"Rest error please check")
              } else {
                callback(null,res);
              }
            });
          }


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
