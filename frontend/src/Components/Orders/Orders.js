import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../../config/config';
import { Redirect } from 'react-router';
import Modal from '../Modal/Modal';

export class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            usertype: localStorage.getItem("usertype"),
            order_list: [],
            items_list:[],
            show : false,

        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        const data = {
            username: this.state.username,
            usertype: this.state.usertype
        }
        console.log("going for order here");
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/cust/showOrders`, data)
            .then(response => {
                this.setState({
                    order_list: JSON.parse(response.data)
                });
            })
            .catch(err => {

            });
    }


    showModal = (e) => {
        console.log("!!!!!!!!!!!!!!!!!!!",(e.target.getAttribute("id")));

        this.setState({
            items_list : JSON.parse(e.target.getAttribute("id"))
        })
        

        this.setState({ 
            show: true,
         });
    }

    hideModal = () => {
        this.setState({ 
            show: false,
         });
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

        let usertype = null;
        if (this.state.ordertype === "cust") {
            usertype = true;
        }
        let getOrder = null;
        if (this.state.order_list != null) {

            getOrder = this.state.order_list.map(order => {
                if (localStorage.getItem('usertype') === 'cust') {
                    return (
                        
                        <table class="table">
                            <tbody>
                                <tr>

                                    <td className="text-center">Order No. {order._id._id}</td>
                                    <td className="text-center">{order._id.rest_name}</td>
                                    <td className="text-center">${order._id.total_cost}</td>

                                    <td>  <select name="orderupdate" value={order.order_status} disabled={usertype} onChange={this.orderUpdateChangeHandler}>
                                        <option selected value=''> -- select an option -- </option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="received">New Order</option>
                                        <option value="Picked Up">Picked Up</option>
                                    </select><br />
                                        <button disabled={usertype} id={order._id.order_id} onClick={this.updateStatus}>Update</button></td>

                                    <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(order._id.item)} onClick={this.showModal}> - </button></td>
                                </tr>

                            </tbody>
                        </table>
                    )
                }
                else {
                    return (
                        <table class="table">
                            <tbody>
                                <tr>

                                    <td className="text-center">Order No. {order._id._id}</td>
                                    <td className="text-center">{order._id.rest_name}</td>
                                    <td className="text-center">${order._id.total_cost}</td>

                                    <td>  <select name="orderupdate" disabled={usertype} onChange={this.orderUpdateChangeHandler}>
                                        <option selected value=''> -- select an option -- </option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="received">New Order</option>
                                        <option value="Picked Up">Picked Up</option>
                                    </select><br />
                                        <button disabled={usertype} id={order} onClick={this.updateStatus}>Update</button></td>

                                    <td className="text-center"><button className="btn bg-transparent" id={order._id.item} onClick={this.showModal}> - </button></td>
                                </tr>

                            </tbody>
                        </table>
                    )
                }
            })
        }

        let modal = null;

        if(this.state.items_list != null){
            modal = <Modal show={this.state.show} handleClose={this.hideModal}>

            <div className="container">
		        <h3>Details</h3>
		        <br />
		        <div>
                {this.state.items_list.map(eachItem => {
		                return (
                            <table className="table" id={eachItem} key={eachItem}>
                                <tbody>
                                    <tr>
                                    <td className="text-center"> {eachItem.item_name}</td>
                                    <td className="text-center">${eachItem.item_price}</td>
                                    <td className="text-center">{eachItem.item_qty}</td>
                                    <td className="text-center">${eachItem.item_qty}*{eachItem.item_price}</td>
                                    </tr>
                                </tbody>
                            </table>
		                );  
		            })}
		        </div>
		        
		    </div>
            </Modal>
            
        }


        return (
            <div>

                ORDER PAGE
                <select name="ordertype" required onChange={this.ordertypeChangeHandler}>
                    <option selected value=''> -- select an option -- </option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pick Up</option>
                </select>
                <select name="orderstatus" required onChange={this.orderStatusChangeHandler}>
                    <option selected value=''> -- select an option -- </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Preparing">Preparing</option>
                    <option value="received">New Order</option>
                    <option value="Picked Up">Picked Up</option>
                </select>
                <button onClick={this.filterOrder}>Apply</button>

                {getOrder}
                {modal}
            </div>
        )
    }
}

export default Orders
