const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custsSchema = new Schema({
    username: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String}
},
{
    versionKey: false
});

const custsModel = mongoose.model('cust', custsSchema);
module.exports = custsModel;