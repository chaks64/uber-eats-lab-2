const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    usertype: {type: String}
},
{
    versionKey: false
});

const usersModel = mongoose.model('user', usersSchema);
module.exports = usersModel;