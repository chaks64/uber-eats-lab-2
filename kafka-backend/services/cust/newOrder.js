let Cust = require("../../models/custModel");
let Rest = require("../../models/restModel");
let Order = require("../../models/orderModel")


function handle_request(msg, callback) {
    console.log("Inside new order kafka backend");
    console.log(msg);
    let username = msg.username;
    let rest_id = msg.rest_id;
    let order_status = msg.order_status;
    let order_type = msg.order_type;
    let address = msg.address;
    let total_cost = msg.total_cost;
    let item = (msg.item);

    const order = new Order({
        order_status,
        order_type,
        address,
        total_cost,
        //tax,
        //food_cost,
        item
    });


    order.save((err, order) => {
        if (err) {
            console.log(err);
            callback(null,"new order error please check")
        } else {

            Cust.findOne({username:username},(err, cust) => {
                if (err) {
                    console.log(err);
                    callback(null, "Error Customer");
                } else {
                    console.log("here for cust order ",order._id);
                    cust.order.push(order._id);
                    cust.save();

                    
                    Rest.findOne({username:rest_id},(err, rest) => {
                        if (err) {
                            console.log(err);
                            callback(null, "Error Rest");
                        } else {
                            console.log("here for rest order ",order._id);
                            rest.order.push(order._id);
                            rest.save();
                            console.log(order);
                            callback(null,order);
                        }
                    });

                    
                    console.log(order);
                    callback(null,order);
                }
            });
        }
    });

    console.log("after callback");
  }
  
  exports.handle_request = handle_request;