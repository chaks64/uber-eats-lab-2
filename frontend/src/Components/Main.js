import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import SideBar from './SideBar/SideBar'
import RestHome from './Home/RestHome'
import CustHome from './Home/CustHome'
import RestPro from './Profile/RestPro'

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
            </div>
        )
    }
}

export default Main
