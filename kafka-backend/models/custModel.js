const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var custsSchema = new Schema({
    username: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String,},
    pincode : {
      type: Number,
      default: 00000
    },
    contact : {
      type: Number,
      default: 1234567890
    },
    add1: {
      type: String,
      default: "---"
    },
    add2: {
      type: String,
      default: "---"
    },
    city: {
      type: String,
      default: "---"
    },
    state: {
      type: String,
      default: "---"
    },
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