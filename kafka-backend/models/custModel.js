const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var custsSchema = new Schema({
    username: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String},
    pincode : {type: Number},
    contact : {type: Number},
    add1: {type: String},
    add2: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    rest: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "rest",
        },
      },
    ],
    order:[
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
      },
    ],
  },
  {
    versionKey: false
});

const custsModel = mongoose.model('cust', custsSchema);
module.exports = custsModel;