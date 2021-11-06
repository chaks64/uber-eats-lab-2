let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside add Fav kafka backend");
    console.log(msg);
    let username = msg.username;

    Cust.find({username:username})
    .select("order")
    .populate('order._id')
    .exec(function (err, orders) {
        if (err){
            return handleError(err);
        } else{
            callback(null, orders);
        }
    });
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;