import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import SideBar from './SideBar/SideBar'
import RestHome from './Home/RestHome'
import CustHome from './Home/CustHome'
import RestPro from './Profile/RestPro1'
import Cust from './Profile/Cust'
import Profile from './Profile/Profile'
import Fav from './Home/Fav'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout'
import UpdateMenu from './Resturant_Menu/UpdateMenu';
import AddMenu from './Resturant_Menu/AddMenu';
import Rest from './Profile/Rest';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={SideBar}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
                <Route path="/resthome" component={RestHome}/>
                <Route path="/custhome" component={CustHome}/>
                <Route path="/restpro" component={RestPro}/>
                <Route path="/cust" component={Cust}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/fav" component={Fav}/>
                <Route path="/order" component={Orders}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/updateMenu" component={UpdateMenu}/>
                <Route path="/addMenu" component={AddMenu}/>
                <Route path="/rest" component={Rest}/>
            </div>
        )
    }
}

export default Main
