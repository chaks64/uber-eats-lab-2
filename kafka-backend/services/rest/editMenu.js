let Rest = require("../../models/restModel");
const AWS = require("aws-sdk");
const multer = require("multer");
const storage = multer.memoryStorage();
const multerObject = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }).single('image');

async function handle_request(msg, callback) { 
    try {
        // const { item_id, dishName, ingredients, price,  description, category,restId, mealType, dishImage} = msg;
        const {rest_id, item_id, item_name,category,description,price,type,path} = msg;
        const update = {
            name : item_name,
            category : category,
            description : description,
            price : price,
            type : type,
            path: path
        }
        const rest = await Rest.findById(rest_id);
        let dish = rest.menu.find(o => String(o._id) === item_id);
        console.log("##########",dish);
        dish.set({...update});
        let result = await rest.save();
        console.log("!!!!!!!!!!!!!!!!!",result);
        callback(null, {status_code: 200, response: { data: result, dish}});
        return;
    } catch(error) {
        console.log(error);
        callback(null, {status_code: 500, response: error});
        return;
    }
}
exports.handle_request = handle_request;
