let Cust = require("../models/custModel");
let Rest = require("../models/restModel");
let Order = require("../models/orderModel")

const placeOrder = async (args) => {
    return new Promise(async (resolve, reject) => {
        let username = args.username;
        let rest_id = args.rest_id;
        let order_status = args.order_status;
        let order_type = args.order_type;
        let address = args.address;
        let total_cost = args.total_cost;
        let item = args.item;
        // let inst = args.inst;
        let rest_name = args.restname;

        const newOrder = new Order({
            order_status,
            order_type,
            address,
            total_cost,
            //tax,
            //food_cost,
            rest_name,
            // inst,
            item
        });

        newOrder.save((err, order) => {
            if (err) {
                console.log(err);
                resolve({ status: 500 });
            } else {
                let order_id = order._id;
                Cust.findOne({username:username},(err, cust) => {
                    if (err) {
                        console.log(err);
                        resolve({ status: 500 });
                    } else {
                        cust.order.push(order_id);
                        cust.save();
    
                    
                        Rest.findOne({_id:rest_id},(err, rest) => {
                            if (err) {
                                console.log(err);
                                resolve({ status: 500 });
                            } else {
                                rest.order.push(order_id);
                                rest.save();
                                resolve({ status: 200 });
                            }
                        });
                        resolve({ status: 200 });
                    }
                });
            }
        });
    });
};

exports.placeOrder = placeOrder;