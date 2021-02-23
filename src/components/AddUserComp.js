import React, { Component } from 'react';
import axios from 'axios';

export default class AddUserComp extends Component {
    constructor(props){
        super(props)
        this.state={
            username:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
        }
        console.log(newUser);

        axios.post('http://localhost:3001/user/add',newUser).then(res=>console.log(res.data));
        
        this.setState({
            username:''
        })
    }

    render() {
        return (
            <div className='container'>
                <br />
                <h1>Add User:</h1>
                <form onSubmit={this.onSubmit}>
                    <span>Username:</span>
                    <input type='text' value={this.state.username} onChange={this.onChangeUsername} />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}