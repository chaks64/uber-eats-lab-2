import React, { Component } from 'react'
import axios from 'axios';
import { config } from '../../config/config';
import { Redirect } from 'react-router';
import './custHome.css'
import './Card.css'
// import { connect } from 'react-redux';
import food from './food.png';
// import Toggle from 'react-toggle';
import NavBar from '../NavBar/NavBar';

export class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            restlist: "",
            filterlist: "",
            // show: false,

            message: "",

        };

       // this.addFav = this.addFav.bind(this);
    }

    componentDidMount = () => {
        console.log("here for rest list");

        const data = {
            username: this.state.username,
        }
        console.log(data);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/showFav`, data)
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

        let getRest = null;

        if (this.state.restlist !== "") {
            getRest = this.state.restlist.map(rest => {
                return (
                    
                    <div className=" feature-box col-sm-3 ">
                        {console.log("!!!!!!!!",rest._id.restname)}
                        <div className="card">
                            <img src={food} alt="Card" />
                            <div className="card__info">
                                <h5 className="">{rest._id.restname}</h5>
                                <p className=""><h6 className="">{rest._id.city}</h6>
                                </p>
                                <button className="button" id={JSON.stringify(rest)} key={rest.rest_id} onClick={this.restChangeHandler}>See Menu</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                <NavBar />
                <div className="container-fluid mar-bor">
                    <div className="row ">
                        {getRest}
                    </div>
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
export default Fav;