var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
const express = require("express");
const mongoose = require("mongoose");

let User = require("./models/userModel");
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


var signup = require("./services/user/signup");

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
handleTopicRequest("signup", signup);
