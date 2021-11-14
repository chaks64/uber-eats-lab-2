let Rest = require("../../models/restModel");

function handle_request(msg, callback) {
    console.log("Inside search rest kafka backend");
    console.log(msg);
    //let search = msg.search;
    let searchReg = new RegExp(msg.search, "i");
    Rest.find(
        { $or: [ {restname: searchReg}, 
            {city: searchReg}, 
            {'menu.category': searchReg}, 
            {'menu.name': searchReg}] }
            // {'menu.category_items.dish_type': searchReg} ] }
    , (err, list) => {
        if (err){
            return handleError(err);
        } else{
            console.log(JSON.stringify(list));
            callback(null, JSON.stringify(list));
        }
    });
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;