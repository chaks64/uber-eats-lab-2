const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restsSchema = new Schema({
    username: {type: String, required: true},
    restname: {type: String, required: true},
    add1: {type: String},
    add2: {type: String},
    city: {type: String},
    state: {type: String},
    pincode: {type: String},
    resttype: {type: String}
},
{
    versionKey: false
});

const restsModel = mongoose.model('rest', restsSchema);
module.exports = restsModel;