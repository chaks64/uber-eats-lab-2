import React, { Component } from 'react';
import './resthome.css';
import './menu.css';
import axios from 'axios';
import { config } from '../../config/config';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

class RestHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rest_id: localStorage.getItem('user_id'),
            menu_list: [],
            eachItem: '',
            show: false,
            name: '',
            price: '',
            value: '',
            path: '',
            restname: '',
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.updateMenu = this.updateMenu.bind(this);
        // this.itemChange = this.itemChange.bind(this);
    }

    componentWillMount() {

        const data = {
            rest_id: this.state.rest_id
        }

        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/rest/showMenu`, data)
            .then(response => {

                this.setState({
                    //menu_list : [],
                    menu_list: response.data.menu,
                    path : response.data.path,
                    restname: response.data.restname
                });
                console.log("menu list", this.state.restname);
                localStorage.setItem("restname",this.state.restname);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: error.response
                })
            });
    }


    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // updateMenu = (e) => {

    //     console.log("hello for update");
    //     let item = e.target.getAttribute("id");

    //     const data = {
    //         rest_id: this.state.rest_id,
    //         item_id: item.item_id,
    //         item_name: item.name,
    //         category: item.category,
    //         description: item.description,
    //         item_price: item.price,
    //         type: item.type
    //     }

    //     axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
    //     axios.post(`${config.backendURL}/rest/editMenu`, data)
    //         .then(response => {

    //             // this.setState({
    //             //     //menu_list : [],
    //             //     menu_list: (response.data)
    //             // });
    //             console.log("menu list", response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.setState({
    //                 //  message: error.response
    //             })
    //         });
    // }


    showModal = (e) => {
        console.log("!!!!!!!!!!!!!!!!!!!", (e.target.getAttribute("id")));

        this.setState({
            eachItem: JSON.parse(e.target.getAttribute("id"))
        })


        this.setState({
            show: true,
        });
    }

    hideModal = () => {
        this.setState({
            show: false,
        });
    }

    inameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }




    render() {
        let getMenu = null;
        if (this.state.menu_list !== "") {
            console.log('INSIDE RENDER METHOD')
            console.log(this.state.menu_list);
            getMenu = this.state.menu_list.map(menu => {
               // mainImage = `${menu.path}`
                return (
                    <div key={menu.category_name} className="menu-category-box">
                        <h2 style={{ fontWeight: "bold" }} id={menu.category_name}>{menu.category_name}</h2>
                        <div className="food-dish-list">
                            {(menu.dishes).map(eachFoodDish => {
                                console.log("!!!!!!!!!!!!!!!!!!", eachFoodDish);
                                return (
                                    <div className="food-dish">
                                        <div className="row">
                                            <div className="col-md-4 food-dish-image" style={{ backgroundImage: `url(${eachFoodDish.path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                                            </div>
                                            <div className="col-md-8 food-dish-data">
                                                <h4 style={{ fontWeight: "bold" }}>{eachFoodDish.name}</h4>
                                                <p>{eachFoodDish.description}.</p>
                                                <div className="price-and-addToCart">
                                                    <p><span style={{ fontSize: "1.35em", marginRight: "25px" }}>${eachFoodDish.price}</span>
                                                        <button id={JSON.stringify(eachFoodDish)} className="addToCartBtn">
                                                            <Link to={{
                                                                pathname: "/updateMenu", state: {
                                                                    item_id: eachFoodDish.item_id,
                                                                    name: eachFoodDish.name,
                                                                    price: eachFoodDish.price,
                                                                    category: eachFoodDish.category,
                                                                    type: eachFoodDish.type,
                                                                    description: eachFoodDish.description,
                                                                    path: eachFoodDish.path
                                                                }
                                                            }}>
                                                                <i className="fa fa-edit addToCartSymbol" id={JSON.stringify(eachFoodDish)} style={{ fontSize: "24px" }}></i>
                                                                <span style={{ marginTop: '-5px' }}>Update Dish</span>
                                                            </Link>
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
                <div className="mar-bor">
                    {getMenu}
                </div>
                {/* {modal} */}
                <center>
                    <button className="addToCartBtn">
                        <Link to={{ pathname: "/addMenu", }}>
                            <i className="fa fa-edit addToCartSymbol" style={{ fontSize: "24px" }}></i>
                            <span style={{ marginTop: '-5px' }}>Add Dish</span>
                        </Link>
                    </button>
                </center>
            </div>
        )
    }
}

export default RestHome;
