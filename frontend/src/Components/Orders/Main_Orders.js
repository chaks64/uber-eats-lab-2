import React, { Component } from 'react';
import { Redirect } from "react-router";

export class Main_Orders extends Component {
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
        console.log(localStorage.getItem("usertype"))
        if (localStorage.getItem("usertype") === 'cust') {
            route = <Redirect to={{ pathname: "/order" }}></Redirect>
        } else {
            route = <Redirect to={{ pathname: "/restorder", }}></Redirect>

        }
        return (
            <div>
                {route}
            </div>
        )

    }
}

export default Main_Orders
