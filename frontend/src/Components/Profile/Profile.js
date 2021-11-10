import React, { Component } from 'react';
import {Redirect} from 'react-router';

export class Profile extends Component {
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

        let redirectVar1 = null;
        if(localStorage.getItem("usertype") === 'cust'){
            redirectVar1 = <Redirect to= "/cust"/>
        }
        else{
            redirectVar1 = <Redirect to= "/cust"/>
        }

        return (
            <div>
                {redirectVar1} 
            </div>
        )
    }
}

export default Profile;