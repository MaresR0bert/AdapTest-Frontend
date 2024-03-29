import React, { Component } from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import {FaBackspace} from 'react-icons/fa';
import {RiUserAddLine} from 'react-icons/ri';


export default class AddUserComp extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            role:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
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

    onChangeRole(event){
        this.setState({
            role: event.target.value
        })
    }

    async onSubmit(event) {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        await axios.post('http://localhost:3001/user/add',newUser).then(res=>console.log(res.data));
        this.setState({
            username:'',
            password:'',
            role:''
        })

        window.location = '/';
    }

    render() {
        return (
            <div className='container'>
                <br />
                <h1>Add User:</h1>
                <form onSubmit={this.onSubmit}>
                    <br />
                    <h5>Username:</h5>
                    <input className='form-control' placeholder='Username' type='text' minLength="6" value={this.state.username} onChange={this.onChangeUsername} />
                    <br />
                    <h5>Password:</h5>
                    <input className='form-control' placeholder='Password' type='password' minLength="8" value={this.state.password} onChange={this.onChangePassword} />
                    <br />
                    <PasswordStrengthBar password = {this.state.password}/>
                    <br />
                    <h5>User role:</h5>
                    <select required className='form-control' value={this.state.role} onChange={this.onChangeRole} title='Your role'>
                        <option value='none'>Choose a Role</option>
                        <option value='teacher'>Teacher</option>
                        <option value='student'>Student</option>
                    </select>
                    <br />
                    <input className="btn btn-dark" type='submit' value="Register" />
                </form>
                <br />
                <button className="btn btn-dark" onClick={()=>{
                    window.location='/'
                }}><FaBackspace /> Back</button>
            </div>
        )
    }
}