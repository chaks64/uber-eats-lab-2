let Rest = require("../../models/restModel");

function handle_request(msg, callback) {
    console.log("Inside add Menu kafka backend");
    console.log(msg);
    let rest_id = msg.rest_id;
    let newMenu = {
        name: msg.item_name,
        category: msg.category,
        description: msg.description,
        type: msg.type,
        price: msg.price,
    }

    Rest.findOne({ _id: rest_id }, (err, rest) => {
        if (err) {
            console.log(err);
            callback(null, "Error");
        } else {
            console.log("!!!!!!!!!!!!!!!!", rest);

            rest.menu.push(newMenu);
            rest.save();
            callback(null, rest);


            // Cust.find({"rest._id": msg.rest_id
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
            //             cust.rest.push(newFav);
            //             cust.save();
            //             callback(null, cust);
            //         }
            //     }
            // });
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;