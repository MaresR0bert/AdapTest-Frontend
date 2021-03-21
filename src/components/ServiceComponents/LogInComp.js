import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    render() {
        if (this.state.status === true) window.location = '/teacher/';
        else if (this.state.status === false) window.location = '/student/'
        else if (this.state.status === 'register') window.location = '/register/'

        return (
            <div className='container'>
                <button onClick={() => {
                    this.setState({
                        status: true
                    })
                }}>Teacher</button>
                <br />
                <button onClick={() => {
                    this.setState({
                        status: false
                    })
                }}>Student</button>
                <br />

                <h1 className='text-center'>Welcome to Adaptest!</h1>
                <h1 className='text-center'>The free adaptive testing platform</h1>
                <br />
                <h2>Log in</h2>
                <br />
                <form>
                    <h5>Username:</h5>
                    <input type='text' className='form-control'></input>
                    <br />
                    <h5>Password:</h5>
                    <input type='password' className='form-control'></input>
                    <br />
                    <input type='submit' className='btn btn-dark btn-lg btn-block' value='Log in'></input>
                </form>
                <br />
                <h2>Or register right here:</h2>
                <button className='btn btn-dark' onClick={() => {
                    this.setState({
                        status: 'register'
                    })
                }}>Register</button>
            </div>
        )
    }
}