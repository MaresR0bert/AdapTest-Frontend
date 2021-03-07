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
        else if(this.state.status === false) window.location = '/student/'

        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        status: true
                    })
                }}>Teacher</button>
                <br/>
                <button onClick={() => {
                    this.setState({
                        status: false
                    })
                }}>Student</button>
            </div>
        )
    }
}