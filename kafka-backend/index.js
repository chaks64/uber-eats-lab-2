var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
const express = require("express");
const mongoose = require("mongoose");

const { mongoDB, frontendURL } = require('../backend/Utils/config');

mongoose
  .connect(
    "mongodb+srv://root:1234@cluster0.gmpv3.mongodb.net/TEST?retryWrites=true&w=majority",
    {
      poolSize: 500,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo connected........");
  })
  .catch((err) => console.log(err));

console.log("here for kafka");

var register = require("./services/user/register");
var login = require("./services/user/login");
var restlist = require("./services/cust/restlist");

var newOrder = require("./services/cust/newOrder");
var custprofile = require("./services/cust/custprofile");
var updatecust = require("./services/cust/updatecust");
var addFav = require("./services/cust/addFav");
var showFav = require("./services/cust/showFav");
var addAddress = require("./services/cust/addAddress");
var showOrders = require("./services/cust/showOrders");
var showReceipt = require("./services/cust/showReceipt");


var itemlist = require("./services/rest/itemlist");
var showMenu = require("./services/rest/showMenu");
var addMenu = require("./services/rest/addMenu");


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    console.log("Inside topic request");
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request


handleTopicRequest("register", register);
handleTopicRequest("login",login);
handleTopicRequest("restlist",restlist);
handleTopicRequest("itemlist",itemlist);
handleTopicRequest("custprofile",custprofile);
handleTopicRequest("updatecust",updatecust);
handleTopicRequest("addFav",addFav);
handleTopicRequest("showFav",showFav);
handleTopicRequest("addAddress",addAddress);
handleTopicRequest("newOrder",newOrder);
handleTopicRequest("showOrders",showOrders);
handleTopicRequest("showReceipt",showReceipt);
handleTopicRequest("showMenu",showMenu);
handleTopicRequest("addMenu",addMenu);
