import React, { Component } from 'react'
import { Redirect } from 'react-router';
import axios from 'axios';
import './profile.css';
import countryList from "react-select-country-list";
import { CountryDropdown } from 'react-country-region-selector';
import { config } from '../../config/config';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import * as moment from 'moment'

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.options = countryList().getData();
        this.state = {
            username: localStorage.getItem("username"),
            fname: '',
            lname: '',
            add1: '',
            add2: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            contact: '',
            dob: '',
            image: '',

            message: '',
            isUpdate: false
        };

        this.dobChangeHandler = this.dobChangeHandler.bind(this);
        this.pincodeChangeHandler = this.pincodeChangeHandler.bind(this);
    }


    componentDidMount() {
        const data = {
            username : this.state.username,
        }

        console.log("profile before",data);
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/custprofile`, data)
            .then(response => {
                console.log(response.data.pincode);
                this.setState({
                    fname: response.data.fname,
                    lname: response.data.lname,
                    add1: response.data.add1,
                    add2: response.data.add2,
                    city: response.data.city,
                    state: response.data.state,
                    pincode: response.data.pincode,
                    country: response.data.country,
                    contact: response.data.contact,
                    // dob: response.data.dob,

                })

            })


            .catch(err => {

            });
    }

    fnameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
    }

    lnameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
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
            contact: e.target.value
        });
    }

    dobChangeHandler(date) {
        this.setState({
            dob: date
        });

       // const NewDate = moment(this.state.dob, 'MM-DD-YYYY').format();
        console.log(this.state.dob);
    }

    updateProfile = (e) => {
        e.preventDefault();
        console.log("update here");
        const data = {
            _id : localStorage.getItem("user_id"),
            username: this.state.username,
            fname: this.state.fname,
            lname: this.state.lname,
            add1: this.state.add1,
            add2: this.state.add2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            //country : this.state.country,
            contact: this.state.contact,
        }

        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${config.backendURL}/cust/updatecust`, data)
            .then(response => {
                this.setState({
                    isUpdate: true
                });
                ;
            })
            .catch(err => {
                console.log(err);
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

        // let redierctHome = null;
        // if (this.state.isUpdate) {
        //     redierctHome = <Redirect to="/home" />;
        // }

        return (
            
            <div>
                {/* {redierctHome} */}
                {console.log(this.state.dob)}
                <div className="container bootstrap snippet">
                    <div className="row">
                        <div className="col-sm-10"><h1>{this.state.username}</h1></div>
                        <div className="col-sm-2"><h1>IMAGE</h1></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center">
                                <img src={'Untitled.png'} className="img-circle img-thumbnail" alt="avatar"/>   
                                {/* <img src={this.state.image} alt="avatar" /> */}
                                <h6>Upload a different photo...</h6>
                                <input type="file" name="image" className="avatar text-center center-block file-upload" multiple={false} onChange={this.fileSelector} />
                                {/* <button className="btn btn-lg btn-success" type="submit" onClick={this.uploadImg}><i className="glyphicon glyphicon-ok-sign"></i> Upload</button> */}
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

                                            <div className="col-xs-6">
                                                <label for="first_name"><h4>First name</h4></label>
                                                <input type="text" className="form-control" value={this.state.fname} onChange={this.fnameChangeHandler} name="fname" id="first_name" placeholder="first name" title="enter your first name if any." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="last_name"><h4>Last name</h4></label>
                                                <input type="text" className="form-control" value={this.state.lname} onChange={this.lnameChangeHandler} name="lname" id="last_name" placeholder="last name" title="enter your last name if any." />
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
                                                <input type="number" className="form-control" value={this.state.contact} onChange={this.phoneChangeHandler} name="contact" id="contact" placeholder="contact Number" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label for="dob"><h4>Date of Birth</h4></label>
                                                <DatePicker className="form-control" dateFormat="MM/dd/yyyy" value={this.state.dob} selected={this.state.dob} onChange={this.dobChangeHandler} name="startDate"  title="Date of Birth"/>
                                                {/* <input type="date" className="form-control" value={this.state.dob} onChange={this.dobChangeHandler} id="state" placeholder="State" title="Date of Birth" /> */}
                                            </div>
                                        </div>




                                        <div className="form-group">
                                            <div className="col-xs-12">
                                                <br />
                                                <button onClick={this.updateProfile} className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
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

export default Profile
