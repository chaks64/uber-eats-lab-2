const graphql = require("graphql");
const { signUp } = require("../mutation/signup")
const { login } = require("../mutation/login");
const { addDish } = require("../mutation/addDish");
const { placeOrder } = require("../mutation/placeOrder");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLFloat
} = graphql;

const LoginType = new GraphQLObjectType({
    name: "Login",
    fields: () => ({
        status: { type: GraphQLInt },
        token: { type: GraphQLString },
    }),
});

const SignupType = new GraphQLObjectType({
    name: "Signup",
    fields: () => ({
        status: { type: GraphQLInt },
        create: { type: GraphQLBoolean },
    }),
});

const AddDishType = new GraphQLObjectType({
    name: "AddDish",
    fields: () => ({
        status: { type: GraphQLInt },
        create: { type: GraphQLBoolean },
    }),
});

const PlaceOrder = new GraphQLObjectType({
    name: "PlaceOrder",
    fields: () => ({
        status: { type: GraphQLInt },
        create: { type: GraphQLBoolean },
    }),
});

const ItemType = new GraphQLInputObjectType({
    name: "item",
    fields: () => ({
        item_id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        qty: { type: GraphQLInt },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        type : {type: GraphQLString},
        path: {type: GraphQLString},
    }),
});



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Root Query",
    fields: {
        login: {
            type: LoginType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args, "args from FE");
                const data = await login(args);
                console.log(data);
                return data;
            },
        },
    },
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signUp: {
            type: SignupType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                usertype: { type: GraphQLString },
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                restname: { type: GraphQLString },
                add1: { type: GraphQLString },
                add2: { type: GraphQLString },
                pincode: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                resttype: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args, "args for signup from FE");
                const data = await signUp(args);
                console.log(data);
                return data;
            },
        },


        addDish: {
            type: AddDishType,
            args: {
                rest_id: { type: GraphQLString },
                item_id: { type: GraphQLString },
                name: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                type: { type: GraphQLString },
                price: { type: GraphQLString },
                path: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args, "args for add dish from FE");
                const data = await addDish(args);
                console.log(data);
                return data;
            },
        },

        placeOrder: {
            type: PlaceOrder,
            args: {
                username: { type: GraphQLString },
                rest_id: { type: GraphQLString },
                restname: { type: GraphQLString },
                order_status: { type: GraphQLString },
                order_type: { type: GraphQLString },
                address: { type: GraphQLString },
                total_cost: { type: GraphQLFloat },
                item: { type: GraphQLList(ItemType) }
                // {
                //     type: new GraphQLList(ItemType),
                //     resolve(parent, args) {
                //         return parent.item;
                //     },
                // },
            },
            async resolve(parent, args) {
                console.log(args, "args for place Order from FE");
                const data = await placeOrder(args);
                console.log(data);
                return data;
            },
        },

    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;