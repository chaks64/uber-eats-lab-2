import React, { Component } from 'react'
import axios from 'axios';
import { config } from '../../config/config';
import { Redirect } from 'react-router';
import './custHome.css';
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

            message: "",

        };
        this.addFav = this.addFav.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchHandle = this.searchHandle.bind(this);
        this.resttypeChangeHandler = this.resttypeChangeHandler.bind(this);
        this.inputSearchHandler = this.inputSearchHandler.bind(this);
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
                    filterlist: JSON.parse(response.data)
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

    searchHandle = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    resttypeChangeHandler = (e) => {
        e.preventDefault();
        let resttype = e.target.value;

        if (resttype === 'all') {
            this.setState({
                filterlist: this.state.restlist
            })
        } else {
            this.setState({
                filterlist: ""
            })
            console.log("****************", resttype);
            //resttype = "both";
            var filteredList =[];
            var arr = (this.state.restlist);
            console.log('array after parse', arr);
            console.log(typeof (arr));
            filteredList = arr.filter(restaurant => restaurant.resttype === resttype);
            console.log('array after filtering', filteredList);

            this.setState({
                filterlist: (filteredList)
            });
        }
    }

    inputSearchHandler = (e) => {
        e.preventDefault();
        let data = {
            search: this.state.searchString
        }

        console.log("here to search", data);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/searchRest`, data)
            .then(response => {
                this.setState({
                    restlist: JSON.parse(response.data),
                    filterlist: JSON.parse(response.data)
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: error.response
                })
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
                        <input id="searchBar" type="search" style={{ width: "50%", margin: "auto" }} onChange={this.searchHandle} className="form-control input-md" name="searchString" value={this.state.searchString} placeholder="What are you craving for? " />
                        <button type="submit" class="btn"><i class="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
        );

        let getRest = null;
        if (this.state.restlist !== "") {
            getRest = this.state.filterlist.map(rest => {
                return (
                    <div className="eachRest" id={JSON.stringify(rest)}>
                        <div id={JSON.stringify(rest)} className="rest-image" style={{ backgroundImage: `url(${rest.path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                            <i className="fa fa-heart a" style={{ fontSize: "20px", color: "white", padding: "10px", float: "right" }} id={JSON.stringify(rest._id)} key={rest._id} onClick={this.addFav}></i>
                        </div>
                        <p id={JSON.stringify(rest)} className="rest-name">{rest.restname} <span className="rating">{rest.rating}</span></p>
                        <p className="delivery-details-line">{rest.fee} Delivery Fee <span className="delivery-time">{rest.time}</span></p>
                        <button className="button" id={JSON.stringify(rest)} key={rest.rest_id}>
                            <Link to={{
                                pathname: "/restpro", state: {
                                    rest_id: rest._id,
                                    restname: rest.restname,
                                    resttype: rest.resttype
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

                <select className="select1" name="itemtype" required onChange={this.resttypeChangeHandler}>
                    <option selected value='all'>Both</option>
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