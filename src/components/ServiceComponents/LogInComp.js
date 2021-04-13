import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            username: '',
            password: '',
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

    async onSubmit(event) {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(newUser);

        await axios.post("http://localhost:3001/user/login/", newUser).then(res=>{
            if(res.data !== 'teacher' && res.data !== 'student') alert("Wrong Credentials")
            this.props.setUser(this.state.username, res.data)
        }).catch(()=>{
            alert("Wrong Credentials")
        })
    }

    render() {
        if (this.state.status === true) window.location = '/register/'

        return (
            <div className='container'>
                <h1 className='text-center'>Welcome to Adaptest!</h1>
                <h1 className='text-center'>The free adaptive testing platform</h1>
                <br />
                <h2>Log in</h2>
                <br />
                <form onSubmit={this.onSubmit}>
                    <h5>Username:</h5>
                    <input type='text' className='form-control' value={this.state.username} onChange={this.onChangeUsername}></input>
                    <br />
                    <h5>Password:</h5>
                    <input type='password' className='form-control' value={this.state.password} onChange={this.onChangePassword}></input>
                    <br />
                    <input type='submit' className='btn btn-dark btn-lg btn-block' value='Log in'></input>
                </form>
                <br />
                <h2>Or register right here:</h2>
                <button className='btn btn-dark' onClick={() => {
                    this.setState({
                        status: true
                    })
                }}>Register</button>
            </div>
        )
    }
}