import React, { Component } from 'react'
import './menu.css';
import axios from 'axios';
import { config } from '../../config/config';
import NavBar from '../NavBar/NavBar';

class UpdateMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rest_id: localStorage.getItem('user_id'),
            item_id: this.props.location.state.item_id,
            name: this.props.location.state.name,
            price: this.props.location.state.price,
            category: this.props.location.state.category,
            type: this.props.location.state.type,
            description: this.props.location.state.description,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateMenu = (e) => {
        e.preventDefault();
        console.log("hello for update");
        

        const data = {
            rest_id: this.state.rest_id,
            item_id: this.state.item_id,
            item_name: this.state.name,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            type: this.state.type
        }

        console.log("data from update menu api",data);

        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`${config.backendURL}/rest/editMenu`, data)
            .then(response => {

                // this.setState({
                //     //menu_list : [],
                //     menu_list: (response.data)
                // });
                (this.props.history.push("/resthome"))
                console.log("menu list", response);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    //  message: error.response
                })
            });
    }

    render() {

                return (
            <div>
                <NavBar />
                {/* {modal} */}

                <div className="container" >
                    <form className="form-style-9" onSubmit={this.updateMenu}>
                        <ul>
                            <li><label>Item Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleInputChange} name="name" className="field-style field-split align-right" placeholder="Item Name" />
                            </li>

                            <li>
                                <label>Item Price</label>
                                <input type="text" value={this.state.price} name="price" className="field-style field-split align-right" onChange={this.handleInputChange} placeholder="Price" />
                            </li>
                            <li>
                                <label>Item type</label>
                                <input type="text" value={this.state.type} name="type" className="field-style field-split align-right" onChange={this.handleInputChange} placeholder="Type" />
                            </li>
                            <li>
                                <label>Item Category</label>
                                <input type="text" value={this.state.category} name="category" className="field-style field-split align-right" onChange={this.handleInputChange} placeholder="Category" />
                            </li>
                            <li>
                                <input type="file" name="image" className="field-style field-full align-none" placeholder="Image" />
                            </li>
                            <li><label>Item Description</label>
                                <textarea name="description" value={this.state.description} className="field-style" onChange={this.handleInputChange} placeholder="Description"></textarea>
                            </li>
                            <li>
                            <button className="btn btn-lg btn-success" type="submit">Save</button>
                            </li>
                        </ul>
                    </form>

                </div>
            </div>
        )
    }
}

export default UpdateMenu
