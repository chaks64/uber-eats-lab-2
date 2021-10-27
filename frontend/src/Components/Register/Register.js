import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './register.css';
import {ReactComponent as Logo} from '../../imgs/ueats.svg'
import axios from 'axios';
import { config } from '../../config/config';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            message : "",
            fname :"",
            lname:"",
            usertype:"cust",
            restname: "",
            add1:"",
            add2:"",
            pincode:"",
            city:"",
            state:"",
            resttype:","
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password,
            fname: this.state.fname,
            lname: this.state.lname,
            usertype: this.state.usertype,
            restname: this.state.restname,
            add1: this.state.add1,
            add2: this.state.add2,
            pincode: this.state.pincode,
            city: this.state.pincode,
            state: this.state.state,
            resttype: this.state.resttype
        };
        axios.post(`${config.backendURL}/user/register`, data)
        .then(response => {
                this.setState({
                    success: true,
                    message: "User created. Please Login..."
                });

                this.props.history.push("/login")

                console.log(response);
        })
        .catch(error => {
            this.setState({
              message: error.response.data
            })
        });
    }


    render() {
        

        let userReg = null;
        if(this.state.usertype === 'rest'){
          userReg = 
        <div>
            <div className="align">
                <input type="text" className="form-control align  radius" onChange = {this.handleInputChange} name="restname" placeholder="Resturant Name" required/>
            </div>

            <div class="form-group row align">
                <div class="col-xs-6 ">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="add1" required  placeholder="Address Line 1"/>
                </div>
                <div class="col-xs-6">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="add2" placeholder="Address Line 2"/>
                </div>
            </div>

            <div class="form-group row align">
                <div class="col-xs-6 ">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="city" required placeholder="City"/>
                </div>
                <div class="col-xs-6">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="state" required placeholder="State"/>
                </div>
            </div>

            <div class="form-group row align">
                <div class="col-xs-6 ">
                <input type="text" pattern='[0-9]+' maxLength="5" className="form-control" onChange = {this.handleInputChange} name="pincode" required placeholder="Pin Code"/>
                </div>
                <div class="col-xs-6">
                <select class="form-control" name="resttype" required onChange = {this.handleInputChange}>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick UP</option>
                    <option value="both">Delivery/Pick UP</option>
                </select>
                </div>
            </div>

          
        </div>
        }
        else{
            userReg =
            <div class="form-group row align">
                <div class="col-xs-6 ">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="fname" required placeholder="First Name"/>
                </div>
                <div class="col-xs-6">
                <input type="text" className="form-control" onChange = {this.handleInputChange} name="lname" required placeholder="Last Name"/>
                </div>
            </div>

          }

        return (
            <div>
                {this.state.message}
                <div>
                <div className="container width">
                
                 <h1>{this.state.message}</h1>
                    <div className="row justify-content-center">
                        <div className=" offset-col-md-4">
                            <div className="card-group mb-0 row">
                                <div className="p-4">
                                    <Logo className="checkwidth"/>
                                    <div className="card-body align">
                                        <h2 className="align">Let's get started</h2>
                                        <form onSubmit={this.onSubmit}>
                                            <div className="align">
                                                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" className="form-control align  radius" onChange = {this.handleInputChange} name="username" placeholder="Email" required/>
                                            </div>
                                            <div className="align">
                                                <input type="password" className="form-control align radius" onChange = {this.handleInputChange} name="password" placeholder="Password" required/>
                                            </div>
                                            <div className="align" >
                                                <select className="form-control radius" name="usertype" required onChange = {this.handleInputChange}>

                                                    <option value="cust">Customer</option>
                                                    <option value="rest">Resturant</option>
                                                </select>
                                            </div>

                                            {userReg}

                                            <div className="align">
                                                <button type="Submit" class="btn btn-success btn-block color btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="text-white py-5 ">
                                    <div className="card-body text-center">
                                        <div className = "align">
                                            <p>Already use Uber..?
                                            <Link className="" to="/login">Sign in</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <footer className="abc">
                    <div className="container-fluid">
                        <div className="margin" style={{width: "50%", float:"left"}}>
                            © 2020 Uber Technologies, Inc.
                        </div>

                        <div className="margin" style={{width: "50%", float:"right"}}>
                            Privacy Policy  |  Terms of Use
                        </div>
                    </div>
               </footer>
            </div>
            </div>
        )
    }
}

export default Register
