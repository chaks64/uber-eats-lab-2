// let User = require("../models/UserModel");
let User = require("../Models/UserModel");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");


const login = async (args) => {
    console.log("here for graph login",args);
    return new Promise(async (resolve, reject) => {
        User.find(
            {
                username: args.username,
            },
            (err, result) => {
                if (err) {
                    console.log("error");
                    resolve({ status: 500 });
                } else {
                    if (result && result[0]) {
                        if (bcrypt.compareSync(args.password, result[0].password)) {
                            const payload = {
                                _id: result[0]._id,
                                username: result[0].username,
                                usertype: result[0].usertype,
                            };
                            const token = jwt.sign(payload, secret);
                            resolve({ status: 200, token: "JWT " + token });
                        } else {
                            console.log("wrong password");
                            resolve({ status: 500 });
                        }
                    } else {
                        console.log("User doesn't exist");
                        resolve({ status: 500 });
                    }
                }
            }
        );
    });
};

exports.login = login;
