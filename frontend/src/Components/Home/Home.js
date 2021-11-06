import React, { Component } from 'react';
import { Redirect } from "react-router";

export class Home extends Component {
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

        let route = null;
        if(localStorage.getItem("usertype") === 'cust'){
            route = <Redirect to={{ pathname: "/custhome",}}></Redirect>
        } else{
            route = <Redirect to={{ pathname: "/resthome",}}></Redirect>
        }
        
        return (
            <div>
                {route}
            </div>
        )
    }
}

export default Home
