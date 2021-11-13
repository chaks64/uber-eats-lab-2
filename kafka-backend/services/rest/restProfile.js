let Rest = require("../../models/restModel");

function handle_request(msg, callback) {
    console.log("Inside get rest profile kafka backend");
    console.log(msg);

    Rest.findOne({ username: msg.username }, (err, result) => {
        if (err) {
            console.log("error")
        } else {
            console.log("resut",result);
            callback(null, result)
        }
    });

    // callback(null,results);
    console.log("after callback");
}

exports.handle_request = handle_request;