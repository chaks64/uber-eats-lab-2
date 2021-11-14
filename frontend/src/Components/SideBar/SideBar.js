import React, { Component } from 'react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiTag, FiLogIn } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { ReactComponent as Logo } from '../../imgs/ueats.svg'
import { Link } from 'react-router-dom';

export class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuCollapse: true,
    };

    //this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.clear();
  }

  menuIconClick = () => {
    if (this.state.menuCollapse) {
      this.setState({
        menuCollapse: false,
      });
    }
    else {
      this.setState({
        menuCollapse: true,
      });
    }

  }

  render() {
    let sideLogin = null
    if (localStorage.getItem("token")) {
      sideLogin = <Menu iconShape="square">
        <MenuItem icon={<FiHome />}><Link to="/home">Home</Link></MenuItem>
        <MenuItem icon={<FiTag />}><Link to="/mainorder">Orders</Link></MenuItem>
        <MenuItem icon={<FaRegHeart />}><Link to="/fav">Favourite</Link></MenuItem>
        <MenuItem icon={<RiPencilLine />}><Link to="/profile">Profile</Link></MenuItem>
      </Menu>
    } else {
      sideLogin = <Menu iconShape="square">
        <MenuItem icon={<FiLogIn />}><Link to="/login">SignIn</Link></MenuItem>
      </Menu>
    }

    return (
      <>
        <div id="header">
          <ProSidebar collapsed={this.state.menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                <p>{this.state.menuCollapse ? "U" : <Logo className="fit" />}</p>
              </div>
              <div className="closemenu" onClick={this.menuIconClick}>
                {this.state.menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                {sideLogin}
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}><Link to="/login" onClick={this.handleLogout} >Logout</Link></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    )
  }
}

export default SideBar