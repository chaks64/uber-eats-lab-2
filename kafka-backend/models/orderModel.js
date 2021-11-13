const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ordersSchema = new Schema({
    order_status: {type: String},
    order_type: {type: String},
    address: {type: String},
    total_cost: {type: Number},
    tax: {type: Number},
    food_cost: {type: Number},
    rest_name: {type: String},
    item: [
            {  // _id : {type: String},
                name: {type: String},
                price: {type: Number},
                qty: {type: Number},
        },
    ],
},
{
    versionKey: false
});

const ordersModel = mongoose.model('order', ordersSchema);
module.exports = ordersModel;