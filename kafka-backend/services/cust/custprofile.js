let Cust = require("../../models/custModel");

function handle_request(msg, callback) {
    console.log("Inside get profile kafka backend");
    console.log(msg);
    
    Cust.findOne({username: msg.username},(err,result)=>{
       if(err){
           console.log("error")
       }else{
           callback(null,result)
       }
   });
  
  // callback(null,results);
    console.log("after callback");
  }
  
  exports.handle_request = handle_request;  