var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const { mongoDB, frontendURL } = require('./Utils/config');
const awsconfig = require('./Utils/keys')
var cors = require('cors');
const multer = require('multer');
const AWS = require("aws-sdk");
var multiparty = require('multiparty');
const fs = require('fs');
const fileType = require('file-type');


AWS.config.update({
    accessKeyId: awsconfig.AWSAccessKeyId,
    secretAccessKey: awsconfig.AWSSecretKey,
    region: awsconfig.region
});

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: awsconfig.bucket,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};

// module.exports = {
//     s3,
//     uploadFile,
// };
// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null, "./");}, 
//     filename: function(req, file, cb){
//         const ext = file.mimetype.split("/")[1];
//         cb(null,`uploads/${file.originalname}`);
//       }
//   });
//   const upload = multer({
//     storage : storage,
//   })


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

app.post('/update', async (req, res) => {
    console.log("here for image ", req.data);
    // res.send('hello from simple server :)')
    const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error);
    }
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);
      const date = Date.now();
      const fileName = `images/${date}`;
      const data = await uploadFile(buffer, fileName, type);
      console.log("Success: ", data);
      return res.status(200).send(data);
    } catch (err) {
      console.log("Upload Error: ", err);
      return res.status(500).send(err);
    }
  });
})

app.use("/user", require("./routes/Register"));
app.use("/user", require("./routes/Login"));

app.use("/cust", require("./routes/Restlist"));
app.use("/cust", require("./routes/CustProfile"));
app.use("/cust", require("./routes/UpdateCust"));
app.use("/cust", require("./routes/AddFav"));
app.use("/cust", require("./routes/ShowFav"));
app.use("/cust", require("./routes/AddAddress"));
app.use("/cust", require("./routes/NewOrder"));
app.use("/cust", require("./routes/ShowOrders"));
app.use("/cust", require("./routes/ShowReceipt"));
app.use("/cust", require("./routes/SearchRest"));

app.use("/rest", require("./routes/ShowMenu"));
app.use("/rest", require("./routes/ItemList"));
app.use("/rest", require("./routes/AddMenu"));
app.use("/rest", require("./routes/EditMenu"));
app.use("/rest", require("./routes/UpdateRest"));
app.use("/rest", require("./routes/UpdateOrder"));
app.use("/rest", require("./routes/RestProfile"));


//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));