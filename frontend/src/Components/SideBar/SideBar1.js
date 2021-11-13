import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { ReactComponent as uberEatsLogo } from '../../imgs/ueats.svg'
import './sidebar.css'

class SideBar1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignInClicked: false,
            isLoginClicked: false,
            isSideNavOpen: false,
            isUberEatsLogoClicked: false,
            isLoggedOut: false,
            show: false,
            qty: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.qtyIncrement = this.qtyIncrement.bind(this);
        this.qtyDecrement = this.qtyDecrement.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });

        if (JSON.parse(localStorage.getItem('UBER_EATS_CART')) == null) {
            alert('Cart is Empty');
        }
    };

    hideModal = () => {
        this.setState({ show: false });
    }


    qtyIncrement = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        console.log("!@!@!@!@!@!@", JSON.stringify(localStorage.getItem('UBER_EATS_CART')));
        //if (cart.restaurant_id === itemClicked.rest_id) {
        let a = cart.menu_items;
        a.map(eachItem => {
            if (eachItem.item_id === itemClicked.item_id) {
                console.log("here for dec");
                eachItem.qty = eachItem.qty + 1;
                console.log(eachItem.qty);
            }
            this.setState({
                qty: eachItem.qty
            })

            return eachItem;
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
    }


    qtyDecrement = (e) => {
        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        console.log(cart);
        // if (cart.restaurant_id === itemClicked.restid) {
        let a = cart.menu_items;
        a.map(eachItem => {
            if (eachItem.item_id === itemClicked.item_id) {
                console.log("here for dec");
                eachItem.qty = eachItem.qty - 1;
                console.log(eachItem.qty);
                if (eachItem.qty < 1) {
                    var pos = a.findIndex(f => f.item_id === itemClicked.item_id)
                    console.log("postions", pos);
                    a.splice(pos, 1);
                }
            }
            this.setState({
                qty: eachItem.qty
            })
            return eachItem;
        })
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(cart));
        // }
    }

    openNav = () => {
        console.log('IN OpenNav function');
        document.getElementsByClassName("sidenav")[0].style.width = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        // this.setState({isSideNavOpen: true});
    }

    closeNav = () => {
        console.log('IN CloseNav function');
        document.getElementsByClassName("sidenav")[0].style.width = "0px";
        document.body.style.backgroundColor = "white";
        // this.setState({isSideNavOpen: false});
    }

    handleLogout = () => {
        localStorage.clear();
    }

    render() {

        let topnav =
            <div id="topNavBar" className="topNav">
                <span style={{ fontSize: "22px", cursor: "pointer", marginLeft: "20px" }} onClick={this.openNav}> &#9776;</span>
                <span>
                    <img id="uber-eats-logo" alt="Uber-eats-logo" src={uberEatsLogo} width="146" height="20" style={{ marginLeft: "10px", marginTop: "-7px" }} />
                </span>
                <span style={{ float: "right" }}>
                    <button id="signInBtn"><Link to="/login">SignIn</Link></button>
                </span>
            </div>;

        if (JSON.parse(localStorage.getItem("username"))) {
            topnav =
                <div id="topNavBar" className="topNav">
                    <span style={{ fontSize: "22px", cursor: "pointer", marginLeft: "20px" }} onClick={this.openNav}> &#9776;</span>
                    <span>
                        <img id="uber-eats-logo" alt="Uber-eats-logo" src={uberEatsLogo} width="146" height="20" style={{ marginLeft: "10px", marginTop: "-7px" }} />
                    </span>
                    <span style={{ float: "right" }}>
                        <button id="logoutBtn"><Link to="/login" onClick={this.handleLogout} >Logout</Link></button>
                    </span>
                </div>;
        }

        let sideNav = (<div id="mySidenav" className="sidenav">
            <div style={{ display: "block" }}>
                <button className="signInBtnSideNav">Sign In</button>
                <span style={{ marginLeft: "-2px" }}><button onClick={this.closeNav}> X </button></span>
            </div>
            <p>Create a business account</p>
            <p>Add your restaurant</p>
            <p>Sign up to deliver</p>
            <div className="sideNavFooter">
                <img style={{ margin: "10px 10px 10px 25px" }} alt="Uber Eats" src={uberEatsLogo} width="60px" height="60px" />
                <span>Check out our apps</span>
                <br />
                <div style={{ paddingLeft: "25px", marginBottom: "15px" }}>
                    <button style={{ backgroundColor: "white", color: "black", border: "0px", padding: "10px 15px", borderRadius: "25px", margin: "0px 5px 0px 10px" }}>iPhone</button>
                    <button style={{ backgroundColor: "white", color: "black", border: "0px", padding: "10px 15px", borderRadius: "25px", margin: "0px 10px 0px 5px" }}>Android</button>
                </div>
            </div>
        </div>);


        let fav = null;
        if ((localStorage.getItem('usertype')) === 'cust') {
            fav = <li className="nav-menu-items"><Link to="/fav">Favorites</Link></li>;
        }
        let navBarMenu = null;
        navBarMenu = <ul className="nav navbar-nav">
            <li className="nav-menu-items"><Link to="/home">Home</Link></li>;
            <li className="nav-menu-items"><Link to="/profile">Profile</Link></li>;
            <li className="nav-menu-items"><Link to="/order">Orders</Link></li>;
            {fav}
            <li><button className="btn nav-menu-items" id="cart-button" onClick={this.showModal}>Cart</button></li>
            {/* <li className="nav-menu-items">Cart</li> */}
        </ul>;


        sideNav =
            (<div id="mySidenav" className="sidenav">
                <div style={{ display: "block" }}>
                    <button className="signInBtnSideNav">Sign In</button>
                    <span style={{ marginLeft: "-2px" }}>
                        <button onClick={this.closeNav}> X </button>
                    </span>
                </div>
                {navBarMenu}
                <div className="sideNavFooter">
                    <img style={{ margin: "10px 10px 10px 25px" }} alt="Uber Eats" src={uberEatsLogo} width="60px" height="60px" /> <span>Check out our apps</span>
                    <br />
                    <div style={{ paddingLeft: "25px", marginBottom: "15px" }}>
                        <button style={{ backgroundColor: "white", color: "black", border: "0px", padding: "10px 15px", borderRadius: "25px", margin: "0px 5px 0px 10px" }}>iPhone</button>  <button style={{ backgroundColor: "white", color: "black", border: "0px", padding: "10px 15px", borderRadius: "25px", margin: "0px 10px 0px 5px" }}>Android</button>
                    </div>
                </div>
            </div>);


        let navigation = (
            <div style={{ zIndex: "9999" }} className="container-fluid navbarContainer mainContentBox">
                <div ref={this.wrapperRef}>
                    {sideNav}
                    {topnav}
                </div>
            </div>
        );


        let modal = null;
        //let itemList = null;
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        if (cart !== null) {
            modal = <Modal show={this.state.show} handleClose={this.hideModal}>
                <div className="container">
                    <h3>Your cart!</h3>
                    <br />
                    <div>
                        {(cart.menu_items).map(eachItem => {
                            console.log(eachItem);
                            return (
                                <table className="table" id={eachItem} key={eachItem}>
                                    <tbody>
                                        <tr>
                                            <td className="text-center"> {eachItem.name}</td>
                                            <td className="text-center">${eachItem.price}</td>
                                            <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        })}
                    </div>
                    <button id="checkout" onClick={this.hideModal}><Link to="/checkout">Proceed to Checkout</Link></button>
                </div>
            </Modal>
        }


        return (
            <div>
                {navigation}
                {modal}
            </div>
        )
    }
}

export default SideBar1
