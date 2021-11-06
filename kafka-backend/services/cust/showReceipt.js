let Order = require("../../models/orderModel");

function handle_request(msg, callback) {
    console.log("Inside add Fav kafka backend");
    console.log(msg);
    let order_id = msg.order_id;

    Order.findOne({_id:order_id},(err, order) => {
        if (err) {
            console.log(err);
            callback(null, "Error");
        } else {
            console.log("!!!!!!!!!!!!!!!!",order.item);

            if(order.item.length > 0){
                let itemList = [];
                for (let i = 0; i < order.item.length; i++) {
                    let itemObj = {
                        item_name: order.item[i].item_name,
                        item_price: order.item[i].item_price,
                    };
                    itemList.push(itemObj);
                }

                callback(null, itemList);
            }

            else{
                console.log("here no Items");
                callback(null, "No Items");
            }

            
            
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