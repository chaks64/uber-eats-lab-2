const Rest = require("../models/restModel");

const addDish = async (args) => {
    return new Promise(async (resolve, reject) => {
        let rest_id = args.rest_id;
        let newMenu = {
            name: args.name,
            category: args.category,
            description: args.description,
            type: args.type,
            price: args.price,
            path: args.path
        }

        Rest.findOne({ _id: rest_id }, (err, rest) => {
            if (err) {
                console.log(err);
                resolve({ status: 500 });
            } else {
                console.log("!!!!!!!!!!!!!!!!", rest);
    
                rest.menu.push(newMenu);
                rest.save();
                resolve({ status: true });
            }
        });

    });
};

exports.addDish = addDish;