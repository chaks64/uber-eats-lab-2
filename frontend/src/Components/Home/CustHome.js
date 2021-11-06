import React, { Component } from 'react'
import axios from 'axios';
import { config } from '../../config/config';
import {Redirect} from 'react-router';
import './custHome.css'
import './Card.css'
import { connect } from 'react-redux';
import food from './food.png';
import Toggle from 'react-toggle';
import {Link} from 'react-router-dom';
import Modal from '../Modal/Modal';

export class CustHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : localStorage.getItem("username"),
            restlist : "",
            filterlist: "",
            show : false,
            
            message : "",
            
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount = (e) =>{
        console.log("here for rest list cust home");
        
        const data = {
            username : this.state.username,
        }

        console.log("@@@@@@@@@@@@@@@@@@",localStorage.getItem('token'));
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post(`${config.backendURL}/cust/restlist`, data)
        .then(response => {
            this.setState({
                restlist: response.data,
                filterlist: response.data
            });
            console.log(this.state.restlist);
        })
        .catch(error => {
            this.setState({
               // message: error.response.data
            })
        });
    }

    showModal = () => {
        this.setState({ show: true });

        if(JSON.parse(localStorage.getItem('UBER_EATS_CART')) == null){
            alert('Cart is Empty');
        }
    };
    
    hideModal = () => {
        this.setState({ show: false });
    }


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

        let getRest = null;

        if(this.state.filterlist !== ""){
            getRest = this.state.filterlist.map(rest =>{
                
                return (
                        <div className=" feature-box col-sm-3 ">
                            
                            <div className="card">
                                <img src={food} alt="Card"/>
                                <div className="card__info">
                                    <h5 className="">{rest.restname}</h5>
                                    <p className=""><h6 className="">{rest.city}</h6>
                                    </p>
                                    <button className="button" id={JSON.stringify(rest)} key={rest.rest_id} onClick={this.restChangeHandler}>CLick Me</button>
                                 </div>
                                 {/* <button id={(rest.rest_id)} key={rest.rest_id} onClick={this.addFav}>Add to Fav</button> */}
                             </div>
                             {/*\\ <h3 id={rest} key={rest} onClick={this.restChangeHandler}> </h3> */}
                             {/* <p id={rest} key={rest} onClick={this.restChangeHandler}>{rest.address_1} {rest.pin_code}</p> */}
                            </div>
                    )
                })
            }


        let modal = null;
        //let itemList = null;
        let cart =   JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        if(cart !== null){
         modal = <Modal show={this.state.show} handleClose={this.hideModal}>
		    <div className="container">
		        <h3>Your cart!</h3>
		        <br />
		        <div>
                    { 
		                (cart.menu_items).map(eachItem => {
		                return (
                            <table className="table" id={eachItem} key={eachItem}>
                                <tbody>
                                    <tr>
                                    <td className="text-center"> {eachItem.item_name}</td>
                                    <td className="text-center">${eachItem.price}</td>
                                    <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></td>
                                    </tr>
                                </tbody>
                            </table>
		                    // <div id={eachItem} key={eachItem} className="each-item container">
		                    //     <div>{eachItem.item_name} <span className="cartQty"><button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="btn bg-transparent" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></span></div>
		                    // </div>
		                );  
		            })}
		        </div>
		        <button id="checkout" onClick={this.hideModal}><Link to="/checkout">Proceed to Checkout</Link></button>
		    </div>
		</Modal>
        }


        let navLogin = null;
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li>
                    <i className="fa fa-shopping-cart fa-2x" style={{color:"grey", margin:"auto"}} onClick={this.showModal}></i></li>
                    <li><Link to="/order">Orders</Link></li>
                    <li/>
                </ul>
            );
        return (
            <div>
               <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href='/home' className="navbar-brand">Uber Eats</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to='/home'>Home</Link></li>
                    </ul>
                    {navLogin}
                    {modal}
                </div>
                </nav>

{/* <div className="wrg-toggle">
    <div className="wrg-toggle-container">
        <div className="wrg-toggle-check">
            <span>Veg</span>
        </div>
        <div className="wrg-toggle-uncheck">
            <span>🌞</span>
        </div>
    </div>
    <div className="wrg-toggle-circle"></div>
    <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
</div> */}
                
                <div className="container-fluid mar-bor">
                    <div className="row ">
                        {getRest}
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) =>{
//     return{
//         user : state.loginreducer.user
//     }
// }

// export default connect(mapStateToProps, null)(CustHome);
export default CustHome;