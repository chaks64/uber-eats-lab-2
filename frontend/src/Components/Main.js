import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import SideBar from './SideBar/SideBar'


class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={SideBar}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
            </div>
        )
    }
}

export default Main
