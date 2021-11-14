let Cust = require("../../models/custModel");
let Rest = require("../../models/restModel");

function handle_request(msg, callback) {
    console.log("Inside show orders kafka backend");
    console.log(msg);
    let username = msg.username;
    let usertype = msg.usertype;

    if (usertype === 'cust') {
        Cust.find({ username: username })
            .select("order")
            .populate('order._id')
            .exec(function (err, orders) {
                if (err) {
                    return handleError(err);
                } else {
                    console.log(JSON.stringify(orders[0].order));
                    callback(null, JSON.stringify(orders[0].order));
                }
        });
    }
    
    else{
        Rest.find({ username: username })
            .select("order")
            .populate('order._id')
            .exec(function (err, orders) {
                if (err) {
                    return handleError(err);
                } else {
                    callback(null, JSON.stringify(orders[0].order));
                }
        });
    }

    console.log("after callback");
}

exports.handle_request = handle_request;