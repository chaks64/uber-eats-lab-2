import React, { Component } from 'react'
import './order.css'
import { Redirect } from 'react-router';
import axios from 'axios';
import { config } from '../../config/config';

export class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodcost: 0,
            qty: '',
            tax: 0,
            total_cost: 0,
            address: '',
            carts: JSON.parse(localStorage.getItem('UBER_EATS_CART')),
            inst: ''
        };
    }

    componentDidMount = () => {
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        let a = cart.menu_items;
        let cost = 0;
        a.map(eachItem => {
            cost = cost + (eachItem.qty * eachItem.price)
            return eachItem
        })

        this.setState({
            foodcost: cost
        })
        console.log(this.state.foodcost);

        this.setState({
            tax: cost * 0.09
        })

        this.setState({
            total_cost: cost + 0.09 * cost
        })

        // const data = {
        //     username : Cookies.get('cookie')
        // }

        // axios.post(`http://${constants.IP.ipAddress}:3001/getaddress`,data)
        //      .then(response => {
        //          console.log(response.data);
        //          this.setState({
        //             //  rest_list : a
        //             address: response.data[0].address1+', '+response.data[0].address2+', '+response.data[0].city+', '+response.data[0].state+', '+response.data[0].country+', '+response.data[0].pin_code
        //          });
        //         console.log("address",this.state.address);



        //      })
        //      .catch(err =>{

        //      });


    }

    qtyDecrement = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));

        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        // if (cart.restaurant_id === itemClicked.restid) {
        let a = cart.menu_items;
        let cost = 0;
        a.map(eachItem => {

            if (eachItem.item_id === itemClicked.item_id) {
                console.log("here for dec");
                eachItem.qty = eachItem.qty - 1;
                console.log(eachItem.qty);
                if (eachItem.qty < 1) {
                    var pos = a.findIndex(f => f.item_id === itemClicked.item_id)
                    console.log("postions", pos);
                    a.splice(pos, 1);
                }
            }

            this.setState({
                qty: eachItem.qty
            })
            cost = cost + (eachItem.qty * eachItem.price)
            return eachItem;
        })
        this.setState({
            foodcost: cost
        })
        console.log(this.state.foodcost);

        this.setState({
            tax: cost * 0.09
        })

        this.setState({
            total_cost: cost + 0.09 * cost
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
    }

    instChange =(e) =>{
        this.setState({inst: e.target.value})
    }

    qtyIncrement = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));

        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));

        // if (cart.restaurant_id === itemClicked.restid) {
        let a = cart.menu_items;
        let cost = 0;
        a.map(eachItem => {
            if (eachItem.item_id === itemClicked.item_id) {
                eachItem.qty = eachItem.qty + 1;
                console.log(eachItem.qty);
            }
            this.setState({
                qty: eachItem.qty
            })
            cost = cost + (eachItem.qty * eachItem.price)
            return eachItem;
        })
        this.setState({
            foodcost: cost
        })
        console.log(this.state.foodcost);

        this.setState({
            tax: (cost * 0.09).toFixed(2)
        })

        this.setState({
            total_cost: (cost + 0.09 * cost).toFixed(2)
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
    }

    placeOrder = () => {
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        const data = {
            username: localStorage.getItem('username'),
            rest_id: cart.restaurant_id,
            order_status: 'new',
            order_type: 'delivery',
            address: "",
            total_cost: this.state.total_cost,
            inst: this.state.inst,
            item: cart.menu_items,

        }
        console.log("get cart", data.menu_items);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/neworder`, data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    //  rest_list : a

                });
                alert('Order Placed...!. Your order id is',response.data._id);
                localStorage.removeItem('UBER_EATS_CART');
                (this.props.history.push("/custhome"))

            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (!(localStorage.getItem("username"))) {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                    }}
                ></Redirect>
            );
        }

        let checkout = null;
        if (localStorage.getItem('UBER_EATS_CART') !== null) {
            let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
            let a = cart.menu_items;
            console.log(cart);
            checkout = a.map(eachItem => {
                // if (eachItem !== null) {
                return (
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="text-center"> {eachItem.name}</td>
                                <td className="text-center">{eachItem.price}</td>
                                <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></td>
                            </tr>
                        </tbody>
                    </table>
                )
                // }
            })
        }


        return (

            <div style={{ width: "100%", border: "1px" }}>
                <div style={{ width: "50%", height: "100px", float: "left" }} >
                    {checkout}
                </div>
                <div style={{ width: "50%", height: "100px", float: "left" }}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="text-center">Items Cost</td>
                                <td className="text-center">${this.state.foodcost}</td>
                            </tr>
                            <tr>
                                <td className="text-center">Tax</td>
                                <td className="text-center">${this.state.tax}</td>
                            </tr>
                            <tr>
                                <td className="text-center">Total Cost</td>
                                <td className="text-center">${this.state.total_cost}</td>
                            </tr>
                        </tbody>
                    </table>
                    Delivery Address<br />
                    <textarea rows="5" cols="60" id="delivery_add" name="description" value={this.state.address}>

                    </textarea><br />
                    Special Instruction<br />
                    <textarea rows="1" onChange={this.instChange} cols="60" id="delivery_add" name="inst" value={this.state.inst}>

                    </textarea><br />
                    <button type="button" onClick={this.placeOrder} class="btn btn-success">Place Order</button>
                </div>
            </div>
        )
    }
}

export default Checkout
