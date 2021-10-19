import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './login.css';
import {ReactComponent as Logo} from '../../imgs/ueats.svg'

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="container width">
                
                {/* <h1>{this.state.message}</h1> */}
                    <div className="row justify-content-center">
                        <div className=" offset-col-md-4">
                            <div className="card-group mb-0 row">
                                <div className="p-4">
                                    <Logo className="checkwidth"/>
                                    <div className="card-body align">
                                        <h2 className="align">Welcome Back</h2>
                                        <p className="text-muted">Sign In to your account</p>
                                        <form onSubmit=" alert('You must be logged in to register');">
                                            <div className="align">
                                                <input type="text" className="form-control rounded-0 align input-lg radius" onChange = {this.handleInputChange} name="username" placeholder="Email" required/>
                                            </div>
                                            <div className="align">
                                                <input type="password" className="form-control align input-lg radius" onChange = {this.handleInputChange} name="password" placeholder="Password" required/>
                                            </div>
                                            <div className="align">
                                                <button type="Submit" class="btn btn-success btn-block color btn-lg">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="text-white py-5 ">
                                    <div className="card-body text-center">
                                        <div className = "align">
                                            <p>New to Uber..?
                                            <Link className="" to="/register"> Create an Account</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <footer className="abc">
                
                        <div className="margin" style={{width: "50%", float:"left"}}>
                            © 2020 Uber Technologies, Inc.
                        </div>

                        <div className="margin" style={{width: "50%", float:"right"}}>
                            Privacy Policy  |  Terms of Use
                        </div>
                    
               </footer>
            </div>
        )
    }
}

export default Login
