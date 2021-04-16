import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarStudent extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <Link to='/student' className='navbar-brand'>AdapTest</Link>
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to='/student/taketest' className='nav-link'>Take Test</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className='navbar-item'>
                            <Link to='/student/' className='nav-link'>You are {this.props.username}</Link>
                        </li>
                        <li className='navbar-item'>
                            <button className='btn btn-dark' onClick={() => {
                                window.location = '/'
                                localStorage.clear()
                            }}>Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}