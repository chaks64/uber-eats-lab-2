import React, { Component } from 'react';
import './restpro.css';
import axios from 'axios';
import { config } from '../../config/config';
import NavBar from '../NavBar/NavBar';

class RestPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rest_id: this.props.location.state.rest_id,
            menu_list: [],
            resttype: this.props.location.state.resttype,
            path: '',
            restname: '',
        };
    }

    componentDidMount() {
        const data = {
            rest_id: this.state.rest_id
        }
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!",this.state.resttype);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/rest/showMenu`, data)
            .then(response => {
                this.setState({
                    menu_list: response.data.menu,
                    path : response.data.path,
                    restname: response.data.restname
                });
                console.log("menu list", this.state.menu_list);
                localStorage.setItem("restname",this.state.restname);
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
        console.log("!@!@!@!@!@!@!@!@!!@!@!",JSON.parse(e.target.getAttribute('id')));
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
            // let mainImage = `"/images/rest1.jpg"`;
            getMenu = this.state.menu_list.map(menu => {
                return (


                    <div key={menu.category} className="menu-category-box">
                        <h3 style={{ fontWeight: "bold" }} id={menu.category}>{menu.category_name}</h3>
                        <div className="food-dish-list">
                            {(menu.dishes).map(eachFoodDish => {

                                // if (eachFoodDish.dish_type === 'veg') {
                                //     mainImage = `"/images/veg.jpg"`;
                                // } else if (eachFoodDish.dish_type === 'nonveg') {
                                //     mainImage = `"/images/nonveg.jpg"`;
                                // } else if (eachFoodDish.dish_type === 'vegan') {
                                //     mainImage = `"/images/vegan.jpg"`;
                                // }
                                console.log("44444444", eachFoodDish)
                                return (

                                    // <div className="food-dish" style={{backgroundImage: `url("/images/rest1.jpg")`}}>
                                    <div className="food-dish">
                                        <div className="row">
                                            <div className="col-md-4 food-dish-image" style={{ backgroundImage: `url(${eachFoodDish.path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                                            </div>
                                            <div className="col-md-8 food-dish-data">
                                                <h4 style={{ fontWeight: "bold" }}>{eachFoodDish.name}</h4>
                                                <p>Famous Orange Sauce. Vegan friendly. Good on everything.</p>

                                                <div className="price-and-addToCart">
                                                    <p><span style={{ fontSize: "1.35em", marginRight: "25px" }}>${eachFoodDish.price}</span>
                                                        <button id={JSON.stringify(eachFoodDish)} onClick={this.addToCartHandler} className="addToCartBtn">
                                                            <i className="fa fa-shopping-cart addToCartSymbol" id={JSON.stringify(eachFoodDish)} style={{ fontSize: "24px" }}></i>
                                                            <span style={{ marginTop: '-5px' }}>Add to Cart</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })
        }


        return (
            <div>
                <NavBar />

                <div className="bgimg" style={{ backgroundImage: `url(${this.state.path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                </div>

                <select name="itemtype" required onChange={this.resttypeChangeHandler}>
                    <option selected value=''> -- select an option -- </option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick Up</option>
                </select>
                <div className="mar-bor">
                    {getMenu}
                </div>
            </div>
        )
    }
}

export default RestPro;
