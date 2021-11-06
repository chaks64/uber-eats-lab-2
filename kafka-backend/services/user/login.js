var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let User = require("../../models/userModel");

function handle_request(msg, callback) {
  console.log("Inside login kafka backend");
  console.log(msg);

  console.log(msg.username);
  User.findOne(
    {
      username: msg.username,
    },
    (err, result) => {
      if (err) {
        console.log("error");
        // res.status(400).json({ msg: err });
      } else {
        if (result) {
            if (!bcrypt.compareSync(msg.password, result.password)) {                
                console.log('Invalid Credentials!');
                let send = {
                  status_code : 401,
                  msg : "Invalid Crednetials!"
                }
                callback(null, send);                
            }
            else {
                console.log("Login success",result);
                const payload = {
                  _id: result._id,
                  username: result.username,
                  usertype: result.usertype,
                };
                const token = jwt.sign(payload, secret, {
                  expiresIn: 1008000
              });
                callback(null,"jwt " + token);
            }
        } else {
          console.log("User doesn't exist");
          callback(null, "User doesn't exist");

          //   res.status(400).json({ msg: "User doesn't exist" });
        }
      }
    }
  );
  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
