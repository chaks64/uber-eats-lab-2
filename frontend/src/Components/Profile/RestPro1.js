import React, { Component } from 'react';
import './restpro.css';
import axios from 'axios';
import { config } from '../../config/config';
import food from './food.png';
import NavBar from '../NavBar/NavBar';

class RestPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rest_id: this.props.location.state.rest_id,
            menu_list: []
        };
    }

    componentDidMount() {
        const data = {
            rest_id: this.state.rest_id
        }

        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/rest/showMenu`, data)
            .then(response => {

                this.setState({
                    //menu_list : [],
                    menu_list: (response.data)
                });
                console.log("menu list", this.state.menu_list);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: error.response
                })
            });
    }


    addToCartHandler = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        console.log(itemClicked);
        if (localStorage.getItem('UBER_EATS_CART')) {
            let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
            if (cart.restaurant_id === this.state.rest_id) {
                let a = cart.menu_items;
                let itemExists = false;
                a.map(eachItem => {
                    if (eachItem.item_id === itemClicked.item_id) {
                        itemExists = true;
                    }
                    return eachItem;
                })
                if (itemExists) {
                    alert('Already added.. Please update quantity from cart');
                } else {
                    itemClicked = {
                        ...itemClicked, qty: 1
                    }
                    a.push(itemClicked);
                    let refreshedCart = {
                        restaurant_id: this.state.rest_id,
                        restaurant_name: this.props.location.state.rest_name,
                        menu_items: a
                    }
                    localStorage.setItem('UBER_EATS_CART', JSON.stringify(refreshedCart));

                    console.log('Item with item_id: ', itemClicked.item_id, ' sucessfully added in cart');
                }
            } else {
                console.log('Cart already contains items from restaurant with id: ', cart.restaurant_id);
                let onset = () => {
                    if (window.confirm("Press a button!")) {
                        console.log("ok");
                        localStorage.removeItem('UBER_EATS_CART');
                    } else {
                        console.log("cancel");
                    }
                }
                onset()
            }
            console.log('CART IS: ', cart);

        } else {
            itemClicked = {
                ...itemClicked, qty: 1
            }
            let newCart = {
                restaurant_id: this.state.rest_id,
                restaurant_name: this.props.location.state.restname,
                menu_items: [itemClicked]
            }
            console.log("NEW CART: ", newCart);
            localStorage.setItem('UBER_EATS_CART', JSON.stringify(newCart));
        }
    }

    render() {
        let getMenu = null;
        if (this.state.menu_list !== "") {
            console.log('INSIDE RENDER METHOD')
            console.log(this.state.menu_list);
            getMenu = this.state.menu_list.map(menu => {
                return (
                    <div key={menu.category} className="w-50 p-3 text-left">
                        <h2 id={menu.category_name}>
                            {menu.category_name}
                        </h2>
                        <div >
                            {console.log("!!!!!!!!!!!!!!!!", menu.dishes)}
                            {(menu.dishes).map(eachFoodDish => {
                                //console.log(eachFoodDish);
                                return (
                                    <div className=" feature-box col-sm-3 ">
                                        {console.log("44444444", eachFoodDish)}
                                        <div className="card">
                                            <img src={food} alt="Card" />
                                            <div className="card__info">
                                                <h5 className="">{eachFoodDish.name}</h5>
                                                <p className=""><h6 className="">${eachFoodDish.price}</h6>
                                                </p>
                                                <button className="button" onClick={this.addToCartHandler} id={JSON.stringify(eachFoodDish)} key={eachFoodDish.name}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                );

                            })}
                            {/* <br/> */}
                        </div>
                    </div>
                );
            })
        }


        return (
            <div>
                <NavBar />
                {/* <div className="row "> */}
                {getMenu}
                {/* </div> */}
            </div>
        )
    }
}

export default RestPro;
