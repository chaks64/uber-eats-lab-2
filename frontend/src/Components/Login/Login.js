import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './login.css';
import { ReactComponent as Logo } from '../../imgs/ueats.svg'
//import { connect } from 'react-redux';
import axios from 'axios';
import { config } from '../../config/config';
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { withApollo } from "react-apollo";
import { loginQuery } from "../../queries/login";
//import { loginAction } from '../../redux/login/loginActions';
//import { loginAction } from "../redux/login/loginActions";




export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authFlag: false,
            usertoken: "",
            usertype: "",
            redirect: false,
            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    // onSubmit = async (e) => {
    //     console.log("here for login");
    //     e.preventDefault();

    //     //this.props.login(this.state.username, this.state.password);

    //     let data = {
    //         username: this.state.username,
    //         password: this.state.password,
    //     };

    //     axios.defaults.withCredentials = true;
    //     const token = await axios.post(`${config.backendURL}/user/login`, data)
    //         .then(response => {
    //             this.setState({
    //                 authFlag: true,
    //                 usertoken: response.data.token,
    //             });
    //             console.log(response.data.status_code);

    //             if (response.data.status_code === "200") {
    //                 // if(response.status_code)
    //                 var decoded = jwt_decode(this.state.usertoken.split(" ")[1]);
    //                 var user = {
    //                     u_id: decoded.id,
    //                     username: decoded.username,
    //                     usertype: decoded.usertype,
    //                 };
    //             } else {
    //                 this.setState({ message: response.data.msg})
    //             }
    //             console.log(user);
    //         })
    //         .catch(error => {
    //             // this.setState({
    //             //     //   message: error.response.data
    //             // })
    //         });
    // };

    onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await this.props.client.query({
            query: loginQuery,
            variables: {
                username: this.state.username,
                password: this.state.password,
            },
        });

        console.log(data);
        console.log(data.login.token);
        this.setState({
            authFlag: true,
            usertoken: data.login.token,
        });

        localStorage.setItem("token", data.login.token);

        var decoded = jwt_decode(data.login.token.split(" ")[1]);
        var user = {
            u_id: decoded.id,
            username: decoded.username,
            usertype: decoded.usertype,
        };
        localStorage.setItem("user", JSON.stringify(user));
        var decoded = jwt_decode((localStorage.getItem("token")));
        localStorage.setItem("user_id", decoded._id);
        localStorage.setItem("username", decoded.username);
        localStorage.setItem("usertype", decoded.usertype);
        
        this.setState({
            redirect: true
        })
    }


    render() {

        let redirectVar = null;
        if ((localStorage.getItem("user"))) {
            console.log("here for login url check");
            var decoded = jwt_decode((localStorage.getItem("token")));
            localStorage.setItem("user_id", decoded._id);
            localStorage.setItem("username", decoded.username);
            localStorage.setItem("usertype", decoded.usertype);
           
            if(this.state.redirect === true){
                redirectVar = <Redirect to="/home" />
            }
            
        }

        // if (JSON.parse(localStorage.getItem("username"))) {
        //     console.log("here for redicrect@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        //     return (
        //         <Redirect
        //             to={{
        //                 pathname: "/home",
        //             }}
        //         ></Redirect>
        //     );
        // }

        //   const renderError = () => {
        //     if (this.props.loginProps.errorFlag) {
        //       console.log("Render error");

        //       return <alert>Login failed</alert>;
        //     }
        //     setTimeout(() => {
        //       this.setState({
        //         errorFlag: false,
        //       });
        //     }, 3000);
        //   }


        if ((localStorage.getItem("username"))) {
            return (
                <Redirect
                    to={{
                        pathname: "/home",
                    }}
                ></Redirect>
            );
        }

        return (
            <div>
                {console.log(this.props)}
                {redirectVar}
                <div className="container width">

                    <h1>{this.state.message}</h1>
                    <div className="row justify-content-center">
                        <div className=" offset-col-md-4">
                            <div className="card-group mb-0 row">
                                <div className="p-4">
                                    <Logo className="checkwidth" />
                                    <div className="card-body align">
                                        <h2 className="align">Welcome Back</h2>
                                        <p className="text-muted">Sign In to your account</p>
                                        <form onSubmit={this.onSubmit}>
                                            <div className="align">
                                                <input type="text" className="form-control rounded-0 align input-lg radius" onChange={this.handleInputChange} name="username" placeholder="Email" required />
                                            </div>
                                            <div className="align">
                                                <input type="password" className="form-control align input-lg radius" onChange={this.handleInputChange} name="password" placeholder="Password" required />
                                            </div>
                                            <div className="align">
                                                <button type="Submit" class="btn btn-success btn-block color btn-lg">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="text-white py-5 ">
                                    <div className="card-body text-center">
                                        <div className="align">
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

                    <div className="margin" style={{ width: "50%", float: "left" }}>
                        © 2020 Uber Technologies, Inc.
                    </div>

                    <div className="margin" style={{ width: "50%", float: "right" }}>
                        Privacy Policy  |  Terms of Use
                    </div>

                </footer>
            </div>
        )
    }
}

// const mapStateToProps = (state, props) => {
// return {
//         loginProps: state.loginState,
//     };
// };

// const actionCreators = {
//     login: loginAction.login,
// };

// export default connect(mapStateToProps, actionCreators)(Login);
export default withApollo(Login);