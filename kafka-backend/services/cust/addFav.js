let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside add Fav kafka backend");
    console.log(msg);
    let rest_id = msg.rest_id;
    let username = msg.username;
    let newFav = {
        _id:rest_id,
    }

    Cust.findOne({username:username},(err, cust) => {
        if (err) {
            console.log(err);
            callback(null, "Error");
        } else {
            Cust.find({"rest._id": msg.rest_id
            }, (err, fav) => {
                if (err) {
                    console.log(err);
                    callback(null, "Error");
                } else{
                    if(fav.length > 0){
                        callback(null, "Already added to Fav");
                    } else{
                        cust.rest.push(newFav);
                        cust.save();
                        callback(null, cust);
                    }
                }
            });
        }
    });

    console.log("after callback");
  }
  
  exports.handle_request = handle_request;