const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemsSchema = new Schema({
    rest_id: {type: String, required: true},
    item_name: {type: String, required: true},
    category: {type: String},
    description: {type: String},
    price: {type: Number},
    type: {type: String},
},
{
    versionKey: false
});

const itemsModel = mongoose.model('item', itemsSchema);
module.exports = itemsModel;