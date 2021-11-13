let Order = require("../../models/orderModel");

async function handle_request(msg, callback) { 
    try {
        const { order_id, order_status} = msg;

        const update = {
            order_status: order_status
        }
        const result = await Order.findByIdAndUpdate(order_id, update, { new:true });
        callback(null, {status_code: 200, response: result});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;