import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className='nav navbar-light bg-light navbar-expand-lg'>
                <Link to='/' className='navbar-brand'>AdapTest</Link>
                <div>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to='/user/add' className='nav-link'>Register User</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/question/add' className='nav-link'>Add Question</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/question/' className='nav-link'>My Pool of Questions</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}