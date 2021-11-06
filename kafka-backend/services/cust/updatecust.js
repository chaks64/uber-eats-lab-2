let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside update profile kafka backend");
    console.log(msg);
  
    Cust.findByIdAndUpdate(
      msg._id,
      {
        $set: {
            contact: msg.contact,
            fname: msg.fname,
            lname: msg.lname,
            pincode: msg.pincode,
            // add1: msg.add1,
            // add2: msg.add2,
            // city: msg.city,
            // state: msg.state,
            // country: msg.country,
        },
      },
      (err, result) => {
        if (err) {
            console.log(err);
          callback(null, "Error");
          // console.log(err);
        } else {
          // console.log(result);
          callback(null, result);
        }
      }
    );
  
    // callback(null,results);
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;