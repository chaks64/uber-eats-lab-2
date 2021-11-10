var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const { mongoDB, frontendURL } = require('./Utils/config');
var cors = require('cors');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

console.log("here for req");
app.use("/user", require("./routes/Register"));
app.use("/user", require("./routes/Login"));

app.use("/cust",require("./routes/Restlist"));
app.use("/cust",require("./routes/CustProfile"));
app.use("/cust",require("./routes/UpdateCust"));
app.use("/cust",require("./routes/AddFav"));
app.use("/cust",require("./routes/ShowFav"));
app.use("/cust",require("./routes/AddAddress"));
app.use("/cust",require("./routes/NewOrder"));
app.use("/cust",require("./routes/ShowOrders"));
app.use("/cust",require("./routes/ShowReceipt"));

app.use("/rest",require("./routes/ShowMenu"));
app.use("/rest",require("./routes/ItemList")); 
app.use("/rest",require("./routes/AddMenu"));

//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));