let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside add Address kafka backend");
    console.log(msg);
    let username = msg.username;
    let address = msg.address;

    Cust.findOne({username:username},(err, cust) => {
        if (err) {
            console.log(err);
            callback(null, "Error");
        } else {
            console.log("!!!!!!!!!!!!!!!!",cust);
            cust.savedAdd.push(msg.address);
            cust.save();
            callback(null, cust);
        }

            // Cust.find({"favorite.r_id": msg.rest_id
            // }, (err, fav) => {
            //     if (err) {
            //         console.log(err);
            //         callback(null, "Error");
            //     } else{
            //         if(fav.length > 0){
            //             console.log("###############",fav.length);
            //             callback(null, "Already added to Fav");
            //         } else{
            //             console.log("here if not ",fav.length);
            //             cust.favorite.push(newFav);
            //             cust.save();
            //             callback(null, cust);
            //         }
            //     }
            // });
        
    });
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;