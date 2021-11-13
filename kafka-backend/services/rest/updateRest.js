let Rest = require("../../models/restModel");

async function handle_request(msg, callback) { 
    try {
        const { rest_id, restname, add1,add2,city, state, pincode, resttype, fee, time, rating, contact} = msg;

        const update = {
            restname: restname,
            city: city,
            state : state,
            pincode: pincode,
            resttype : resttype,
            fee : fee,
            time : time,
            add1: add1,
            add2: add2,
            rating: rating,
            contact: contact
        }
        const result = await Rest.findByIdAndUpdate(rest_id, update, { new:true });
        callback(null, {status_code: 200, response: result});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}

exports.handle_request = handle_request;