var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
const Item = require("../../models/itemModel");


async function handle_request(msg, callback) {
    console.log("Inside item list kafka backend");
   
  
    let rest_id = msg.rest_id;
    // const rest = new User({
    //   username,
    // });

    console.log(rest_id);
    Item.find({rest_id: msg.rest_id},(err, result) => {
    if (err) {
    console.log(err);
    callback(null,"hello rest does not exisits")
    } else {
        console.log("hello item list",result);
        resultset =  JSON.parse(JSON.stringify(result));
        const menu = new Map();
      resultset.forEach(menuItem => {

        let category = menuItem.category;
        let itemArray = menu.get(category)
        if(itemArray){
          let item ={
            item_id : menuItem.item_id,
            item_name : menuItem.item_name,
            description : menuItem.description,
            price : menuItem.price,
            restid : menuItem.rest_id,
            cate : menuItem.category,
            type : menuItem.type
          };
          itemArray.push(item);
          menu.set(category, itemArray);
        }        
        else{
          let item = {
            item_id: menuItem.item_id,
            item_name: menuItem.item_name,
            description : menuItem.description,
            price : menuItem.price,
            restid : menuItem.rest_id,
            cate : menuItem.category,
            type : menuItem.type
          };
          itemArray = [item];
          menu.set(category, itemArray);
        }
      });

      let finalMenu = [];
      console.log('MENU MAP: ', menu);
      menu.forEach((value, key, map) => { 
        console.log('KEY: ', key);
        console.log('VALUE: ', value);

        let temp = {
          category_name: key,
          dishes: value
        }

        finalMenu.push(temp);
      })

    //   res.writeHead(200,{
    //   'Content-Type' : 'application/json'
    // });

    console.log(JSON.stringify(finalMenu));
    //res.end(JSON.stringify(finalMenu));


        // console.log(JSON.stringify(res));
        // res.forEach(function (element) {
        //     element.pincode = Math.abs(element.pincode-12120);
        // });
        
        // res.sort((a, b) => a.pincode - b.pincode);
        callback(null,finalMenu);
    }
    });
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;