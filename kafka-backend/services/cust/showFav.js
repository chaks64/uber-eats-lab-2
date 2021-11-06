let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside add Fav kafka backend");
    console.log(msg);
    let username = msg.username;

    Cust.find({username:username})
    .select("rest")
    .populate('rest._id')
    .exec(function (err, list) {
        if (err){
            return handleError(err);
        } else{
            callback(null, list);
        }
    });

    // Cust.findOne({username:username},(err, cust) => {
    //     if (err) {
    //         console.log(err);
    //         callback(null, "Error");
    //     } else {
    //         console.log("!!!!!!!!!!!!!!!!",cust.favorite);

    //         if(cust.favorite.length > 0){
    //             let favList = [];
    //             for (let i = 0; i < cust.favorite.length; i++) {
    //                 let favObj = {
    //                     r_id: cust.favorite[i].r_id,
    //                     r_name: cust.favorite[i].r_name,
    //                 };
    //                 favList.push(favObj);
    //             }

    //             callback(null, favList);
    //         }

    //         else{
    //             console.log("here no fav");
    //             callback(null, "No Favourites");
    //         }

            
            
    //     }
    // });

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