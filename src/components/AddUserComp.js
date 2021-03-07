import React, { Component } from 'react';
import axios from 'axios';

export default class AddUserComp extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(newUser);

        axios.post('http://localhost:3001/user/add',newUser).then(res=>console.log(res.data));
        
        this.setState({
            username:'',
            password:''
        })
    }

    render() {
        return (
            <div className='container'>
                <br />
                <h1>Add User:</h1>
                <form onSubmit={this.onSubmit}>
                    <br />
                    <h5>Username:</h5>
                    <input className='form-control' type='text' minLength="6" value={this.state.username} onChange={this.onChangeUsername} />
                    <br />
                    <h5>Password:</h5>
                    <input className='form-control' type='password' minLength="6" value={this.state.password} onChange={this.onChangePassword} />
                    <br />
                    <input className="btn btn-dark" type='submit' />
                </form>
            </div>
        )
    }
}