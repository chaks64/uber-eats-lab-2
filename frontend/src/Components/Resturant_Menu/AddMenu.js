import React, { Component } from 'react'
import './menu.css';
import axios from 'axios';
import { config } from '../../config/config';
import NavBar from '../NavBar/NavBar';
import { addDishMutation } from "../../mutations/mutations";
import { graphql } from "react-apollo";

class AddMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rest_id: localStorage.getItem('user_id'),
            item_id: '',
            name: '',
            price: '',
            category: '',
            type: '',
            description: '',
            path: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.fileSelector = this.fileSelector.bind(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    fileSelector = (e) => {
        let data = new FormData();
        data.append('file', e.target.files[0], e.target.files[0].name)
        axios.post(`${config.backendURL}/update`,
            data, {
            headers: { "Content-Type": "multipart/form-data", }
            ,
        })
            .then(response => {
                console.log(response.data.Location);
                this.setState({
                    path: response.data.Location
                })
            })
            .catch(err => {
                console.log('err')
            });
    }

    // addMenu = (e) => {
    //     e.preventDefault();
    //     console.log("hello for add");


    //     const data = {
    //         rest_id: this.state.rest_id,
    //         item_id: this.state.item_id,
    //         item_name: this.state.name,
    //         category: this.state.category,
    //         description: this.state.description,
    //         price: this.state.price,
    //         type: this.state.type,
    //         path: this.state.path
    //     }

    //     console.log("data from update menu api",data);

    //     axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
    //     axios.post(`${config.backendURL}/rest/addMenu`, data)
    //         .then(response => {

    //             // this.setState({
    //             //     //menu_list : [],
    //             //     menu_list: (response.data)
    //             // });
    //             (this.props.history.push("/resthome"))
    //             console.log("menu list", response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.setState({
    //                 //  message: error.response
    //             })
    //         });
    // }

    addMenu = async (e) => {
        e.preventDefault();
        const result = await this.props.addDishMutation({
            variables: {
                rest_id: this.state.rest_id,
                item_id: this.state.item_id,
                name: this.state.name,
                category: this.state.category,
                description: this.state.description,
                price: this.state.price,
                type: this.state.type,
                path: this.state.path
            },
        });
        console.log(result.data);

        this.setState({
            success: true,
            message: "Dish added..."
        });

        this.props.history.push("/resthome")
    }

    render() {

        return (
            <div>
                <NavBar />
                {/* {modal} */}

                <div className="container" >
                    <form className="form-style-9" onSubmit={this.addMenu}>
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
                                <input type="file" name="image" className="field-style field-full align-none" placeholder="Image" multiple={false} onChange={this.fileSelector} />
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

export default graphql(addDishMutation, { name: "addDishMutation" })(AddMenu);
