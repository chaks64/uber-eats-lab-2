import React, { Component } from 'react'

import { Redirect } from 'react-router';
import axios from 'axios';
import './profile.css';
import countryList from "react-select-country-list";
import { CountryDropdown } from 'react-country-region-selector';
// import FormData from 'form-data'
import { config } from '../../config/config';

class Profile_Rest extends Component {

    constructor() {
        super();
        this.options = countryList().getData();
        this.state = {
            _id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
            rest_name: '',
            add1: '',
            add2: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            phone: '',
            resttype: '',
            fee: '',
            time: '',
            rating: '',
            path: '',
            //image: '',

            message: ''
        };
    }


    componentDidMount() {
        const data = {
            username: this.state.username
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("profile rest before");
        axios.post(`${config.backendURL}/rest/restProfile`, data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    rest_name: response.data.restname,
                    add1: response.data.add1,
                    add2: response.data.add2,
                    city: response.data.city,
                    state: response.data.state,
                    pincode: response.data.pincode,
                    phone: response.data.contact,
                    resttype: response.data.resttype,
                    time: response.data.time,
                    path: response.data.path
                })

            })
            .catch(err => {
                console.log(err);
            });
    }


    rest_nameChangeHandler = (e) => {
        this.setState({
            rest_name: e.target.value
        })
    }

    add1ChangeHandler = (e) => {
        this.setState({
            add1: e.target.value
        })
    }

    add2ChangeHandler = (e) => {
        this.setState({
            add2: e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    pincodeChangeHandler = (e) => {
        this.setState({
            pincode: e.target.value
        })
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    phoneChangeHandler(e) {
        this.setState({
            phone: e.target.value
        });
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    fileSelector = (e) => {
        let data = new FormData();
        data.append('file', e.target.files[0], e.target.files[0].name)
        axios.post('http://localhost:3001/update',
            data, {
            headers: { "Content-Type": "multipart/form-data", }
            ,
        })
            .then(response => {
                console.log(response.data.Location);
                this.setState({
                    path: response.data.Location
                })
            })
            .catch(err => {
                console.log('err')
            });

    }


    updateProfile = (e) => {
        e.preventDefault();
        console.log("update rest here");
        const data = {
            rest_id: this.state._id,
            restname: this.state.rest_name,
            add1: this.state.add1,
            add2: this.state.add2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            resttype: this.state.resttype,
            fee: this.state.fee,
            time: this.state.time,
            rating: this.state.rating,
            contact: this.state.phone,
            path: this.state.path
        }

        axios.post(`${config.backendURL}/rest/updateRest`, data)
            .then(response => {
                // this.setState({
                //     //  rest_list : a
                //     rest_list: response.data
                // });
                // ;
                (this.props.history.push("/resthome"))
                console.log("menu list", response);
            })
            .catch(err => {

            });

    }

    render() {

        if (!(localStorage.getItem("username"))) {
            console.log("here for profile");
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                    }}
                ></Redirect>
            );
        }


        return (
            <div>
                <div className="container bootstrap snippet">
                    <div className="row">
                        <div className="col-sm-10"><h1>{this.state.username}</h1></div>
                        <div className="col-sm-2"><h1>IMAGE</h1></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center">
                                <img src={this.state.path} className="img-circle img-thumbnail" alt="avatar" />
                                <h6>Upload a different photo...</h6>
                                <input type="file" name="path" className="avatar text-center center-block file-upload" multiple={false} onChange={this.fileSelector} />
                            </div><br />
                        </div>
                        <div className="col-sm-9">
                            <ul className="nav nav-tabs">
                                <li className="active"><a data-toggle="tab" href="#home">Home</a></li>

                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home">

                                    <form className="form" onSubmit={this.updateProfile}>
                                        <div className="form-group">

                                            <div className="col-xs-12">
                                                <label for="first_name"><h4>Resturant name</h4></label>
                                                <input type="text" className="form-control" value={this.state.rest_name} onChange={this.rest_nameChangeHandler} name="rest_name" id="rest_name" placeholder="Restutant name" title="enter your resturant name if any." />
                                            </div>
                                        </div>

                                        <div className="form-group">

                                            <div className="col-xs-6">
                                                <label for="address"><h4>Address Line 1</h4></label>
                                                <input type="text" className="form-control" value={this.state.add1} onChange={this.add1ChangeHandler} name="add1" id="add1" placeholder="enter street, apt" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="address"><h4>Address Line 2</h4></label>
                                                <input type="text" className="form-control" value={this.state.add2} onChange={this.add2ChangeHandler} name="add2" id="add2" placeholder="enter address" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="city"><h4>City</h4></label>
                                                <input type="text" className="form-control" value={this.state.city} onChange={this.cityChangeHandler} name="city" id="city" placeholder="City" />
                                            </div>
                                        </div>

                                        <div className="form-group">

                                            <div className="col-xs-6">
                                                <label for="state"><h4>State</h4></label>
                                                <input type="text" className="form-control" value={this.state.state} onChange={this.stateChangeHandler} id="state" placeholder="State" title="enter a location" />
                                            </div>
                                        </div>
                                        <div className="col-xs-6">
                                            <label for="country"><h4>Country</h4></label>
                                            <CountryDropdown className="form-control" value={this.state.country} onChange={(val) => this.selectCountry(val)} />
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="pincode"><h4>Pin Code</h4></label>
                                                <input type="number" className="form-control" value={this.state.pincode} onChange={this.pincodeChangeHandler} name="pincode" id="phone" placeholder="Pin Code" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="phone"><h4>Phone Number</h4></label>
                                                <input type="number" className="form-control" value={this.state.phone} onChange={this.handleInputChange} name="phone" id="phone" placeholder="Phone Number" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="resttype"><h4>Type</h4></label>
                                                <input type="text" className="form-control" value={this.state.resttype} onChange={this.handleInputChange} name="resttype" id="resttype" placeholder="Resturant Type" />
                                            </div>

                                            <div className="col-xs-6">
                                                <label for="time"><h4>Timings</h4></label>
                                                <input type="text" className="form-control" value={this.state.time} onChange={this.handleInputChange} name="time" id="time" placeholder="Timings" />
                                            </div>
                                        </div>



                                        <div className="form-group">
                                            <div className="col-xs-12">
                                                <br />
                                                <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                            </div>
                                        </div>



                                    </form>



                                </div>


                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Profile_Rest
