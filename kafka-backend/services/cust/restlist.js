var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let Cust = require("../../models/custModel");
const Rest = require("../../models/restModel");
let User = require("../../models/userModel");


async function handle_request(msg, callback) {
  console.log("Inside restlist kafka backend");
  console.log(msg);

  let username = msg.username;
  const user = new User({
    username,
  });

  Cust.findOne({ username: msg.username }, (err, result) => {
    if (result) {
      console.log("found restlist");
      Rest.find({})
        .exec((err, res) => {
          if (err) {
            console.log(err);
            callback(null, "Customer does not exisits12121")
          } else {
            console.log("121212121",result.pincode);
            res.forEach(function (element) {
              element.pincode = Math.abs(element.pincode - result.pincode);//12120 is cust pincode
            });

            res.sort((a, b) => a.pincode - b.pincode);
            callback(null, JSON.stringify(res));
          }
        });

    } else {
      console.log(err);
      callback(null, "Customer does not exisits")
    }
  });

  console.log("after callback");
}

exports.handle_request = handle_request;
