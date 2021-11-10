import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { Redirect } from 'react-router';

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            qty: ''
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.qtyIncrement = this.qtyIncrement.bind(this);
        this.qtyDecrement = this.qtyDecrement.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });

        if (JSON.parse(localStorage.getItem('UBER_EATS_CART')) == null) {
            alert('Cart is Empty');
        }
    };

    hideModal = () => {
        this.setState({ show: false });
    }


    qtyIncrement = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));

        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        console.log("!@!@!@!@!@!@", JSON.stringify(localStorage.getItem('UBER_EATS_CART')));
        //if (cart.restaurant_id === itemClicked.rest_id) {
        let a = cart.menu_items;

        a.map(eachItem => {


            if (eachItem.item_id === itemClicked.item_id) {
                console.log("here for dec");
                eachItem.qty = eachItem.qty + 1;
                console.log(eachItem.qty);
            }
            this.setState({
                qty: eachItem.qty
            })

            return eachItem;
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
    }


    qtyDecrement = (e) => {

        let itemClicked = JSON.parse(e.target.getAttribute('id'));

        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        console.log(cart);
        // if (cart.restaurant_id === itemClicked.restid) {
        let a = cart.menu_items;

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

            return eachItem;
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
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


        let modal = null;
        //let itemList = null;
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        if (cart !== null) {
            modal = <Modal show={this.state.show} handleClose={this.hideModal}>
                <div className="container">
                    <h3>Your cart!</h3>
                    <br />
                    <div>
                        {
                            (cart.menu_items).map(eachItem => {
                                console.log(eachItem);
                                return (
                                    <table className="table" id={eachItem} key={eachItem}>
                                        <tbody>
                                            <tr>
                                                <td className="text-center"> {eachItem.name}</td>
                                                <td className="text-center">${eachItem.price}</td>
                                                <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            })}
                    </div>
                    <button id="checkout" onClick={this.hideModal}><Link to="/checkout">Proceed to Checkout</Link></button>

                </div>
            </Modal>
        }


        let navLogin = null;
        navLogin = (
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <i className="fa fa-shopping-cart fa-2x" style={{ color: "grey", margin: "auto" }} onClick={this.showModal}></i></li>
                <li><Link to="/order">Orders</Link></li>
                <li />
            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href='/home' className="navbar-brand">Uber Eats</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to='/home'>Home</Link></li>
                        </ul>
                        {navLogin}
                        {modal}
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar
