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
    let inst = msg.inst;
    let rest_name = msg.restname;

    const newOrder = new Order({
        order_status,
        order_type,
        address,
        total_cost,
        //tax,
        //food_cost,
        rest_name,
        inst,
        item
    });


    newOrder.save((err, order) => {
        if (err) {
            console.log(err);
            callback(null,"new order error please check")
        } else {
            let order_id = order._id;
            Cust.findOne({username:username},(err, cust) => {
                if (err) {
                    console.log(err);
                    callback(null, "Error Customer");
                } else {
                    cust.order.push(order_id);
                    cust.save();

                
                    Rest.findOne({_id:rest_id},(err, rest) => {
                        if (err) {
                            console.log(err);
                            callback(null, "Error Rest");
                        } else {
                            rest.order.push(order_id);
                            rest.save();
                            callback(null,order);
                        }
                    });

                    
                    callback(null,order);
                }
            });
        }
    });

    console.log("after callback");
  }
  
  exports.handle_request = handle_request;