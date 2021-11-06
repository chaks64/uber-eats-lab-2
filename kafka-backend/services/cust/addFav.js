let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside add Fav kafka backend");
    console.log(msg);
    let rest_id = msg.rest_id;
    //let rest_name = msg.rest_name;
    let username = msg.username;
    let newFav = {
        _id:rest_id,
       // r_name:rest_name
    }

    Cust.findOne({username:username},(err, cust) => {
        if (err) {
            console.log(err);
            callback(null, "Error");
        } else {
            console.log("!!!!!!!!!!!!!!!!",cust);

            Cust.find({"rest._id": msg.rest_id
            }, (err, fav) => {
                if (err) {
                    console.log(err);
                    callback(null, "Error");
                } else{
                    if(fav.length > 110){
                        console.log("###############",fav.length);
                        callback(null, "Already added to Fav");
                    } else{
                        console.log("here if not ",fav.length);
                        cust.rest.push(newFav);
                        cust.save();
                        callback(null, cust);
                    }
                }
            });
        }
    });

    // Cust.findOneAndUpdate({username:username},{
    //     $push:{favorite : newFav},
    // },
    // (err, result) => {
    //     if (err) {
    //         console.log(err);
    //       callback(null, "Error");
    //       // console.log(err);
    //     } else {
    //       // console.log(result);
    //       callback(null, result);
    //     }
    //   }
    // );



    console.log("after callback");
  }
  
  exports.handle_request = handle_request;