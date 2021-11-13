import React, { Component } from 'react'
import axios from 'axios';
import { config } from '../../config/config';
import { Redirect } from 'react-router';
import './custHome.css'
//import './Card.css'
// import { connect } from 'react-redux';
// import food from './food.png';
// import Toggle from 'react-toggle';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

export class CustHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            restlist: "",
            filterlist: "",
            searchString: "",
            // resttype:"",

            message: "",

        };

        // this.showModal = this.showModal.bind(this);
        // this.hideModal = this.hideModal.bind(this);
        this.addFav = this.addFav.bind(this);
    }

    componentDidMount = () => {
        console.log("here for rest list");

        const data = {
            username: this.state.username,
        }
        console.log(data);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/restlist`, data)
            .then(response => {
                this.setState({
                    restlist: JSON.parse(response.data),
                    filterlist: response.data
                });
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

    resttypeChangeHandler = (e) => {
        e.preventDefault();
        let resttype = e.target.value;
        console.log("****************",resttype);
        resttype = "both";
        
        var arr = JSON.parse(this.state.filterlist);
        console.log('array after parse', arr);
        console.log(typeof (arr));
        var filteredList = arr.filter(restaurant => restaurant.resttype === resttype);
        console.log('array after filtering', filteredList);
        this.setState({
            restlist: (filteredList)
        });
    }


    addFav = (e) => {
        console.log("here to add fav");
        e.preventDefault();
        let dummy = e.target.getAttribute("id");
        let rest_id = dummy.replaceAll('"', '');
        const data = {
            username: this.state.username,
            rest_id: rest_id
        }

        console.log("here to add fav", data);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/addFav`, data)
            .then(response => {
                console.log("success add fav", response);
                if (response.status === 201) {
                    alert('Already Added ');
                } else {
                    alert('Added to Fav');
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: error.response
                })
            });


    }

    // showModal = () => {
    //     this.setState({ show: true });

    //     if (JSON.parse(localStorage.getItem('UBER_EATS_CART')) == null) {
    //         alert('Cart is Empty');
    //     }
    // };

    // hideModal = () => {
    //     this.setState({ show: false });
    // }


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


        let searchBar = (
            <div className="row" id="search-box">
                <form onSubmit={this.inputSearchHandler}>
                    <div className="form-group">
                        <input id="searchBar" type="search" style={{ width: "50%", margin: "auto" }} onChange={this.handleInputChange} className="form-control input-md" name="searchString" value={this.state.searchString} placeholder="What are you craving for? " />
                    </div>
                </form>
            </div>
        );

        let getRest = null;
        if (this.state.restlist !== "") {
            getRest = this.state.restlist.map(rest => {
                return (
                    <div className="eachRest" id={JSON.stringify(rest)}>
                        <div id={JSON.stringify(rest)} className="rest-image" style={{ backgroundImage: `url("/images/rest1.jpg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                            <i className="fa fa-heart a" style={{ fontSize: "20px", color: "white", padding: "10px", float: "right" }} id={JSON.stringify(rest._id)} key={rest._id} onClick={this.addFav}></i>
                        </div>
                        <p id={JSON.stringify(rest)} className="rest-name">{rest.restname} <span className="rating">{rest.rating}</span></p>
                        <p className="delivery-details-line">{rest.fee} Delivery Fee <span className="delivery-time">{rest.time}</span></p>
                        <button className="button" id={JSON.stringify(rest)} key={rest.rest_id}>
                            <Link to={{
                                pathname: "/restpro", state: {
                                    rest_id: rest._id,
                                    restname: rest.restname
                                }
                            }}>
                                See Menu</Link>
                        </button>
                    </div>
                )
            })
        }



        return (
            <div>
                <NavBar />
                {searchBar}

                <select name="itemtype"  required onChange={this.resttypeChangeHandler}>
                    <option selected value=''> -- select an option -- </option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick Up</option>
                </select>

                <div className="mar-bor"> 

                    {getRest}

                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) =>{
//     return{
//         user : state.loginreducer.user
//     }
// }

// export default connect(mapStateToProps, null)(CustHome);
export default CustHome;