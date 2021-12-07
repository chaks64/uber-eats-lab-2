let User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");
var bcrypt = require("bcryptjs");
let Cust = require("../models/custModel");
const Rest = require("../models/restModel");

const signUp = async (args) => {
    return new Promise(async (resolve, reject) => {
        let username = args.username;
        let password = await bcrypt.hash(args.password, 10);
        let usertype = args.usertype;
        let fname = args.fname;
        let lname = args.lname;
        let restname = args.restname;
        let add1 = args.add1;
        let add2 = args.add2;
        let city = args.city;
        let state = args.state;
        let pincode = args.pincode;
        let resttype = args.resttype;

        const newUser = new User({
            username,
            password,
            usertype
        });
        User.findOne({ username: args.username }, (err, result) => {
            if (result) {
                console.log("found");
                console.log(result);
                resolve({ status: 500 });
            } else {
                newUser.save((err, result) => {
                    if (err) {
                        // res.status(500).send();
                    } else {

                        if (usertype === "cust") {
                            console.log("cust here", result);
                            const newCust = new Cust({
                                _id: result._id,
                                username,
                                fname,
                                lname
                            });
                            newCust.save((err, res) => {
                                if (err) {
                                    console.log(err);
                                    resolve({ status: 500 });
                                } else {
                                    resolve({ status: 200, user: res });
                                }
                            });
                        }


                        //resturant here
                        else {
                            console.log("rest here");

                            const newRest = new Rest({
                                _id: result._id,
                                username,
                                restname,
                                add1,
                                add2,
                                city,
                                state,
                                pincode,
                                resttype
                            })

                            newRest.save((err, res) => {
                                if (err) {
                                    console.log(err);
                                    resolve({ status: 500 });
                                } else {
                                    resolve({ status: 200, user: res })
                                }
                            });
                        }


                    }
                });
            }
        });
    });
};

exports.signUp = signUp;