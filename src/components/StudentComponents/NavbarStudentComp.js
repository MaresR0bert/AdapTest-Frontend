import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarStudent extends Component {
    render() {
        return (
            <nav className='nav navbar-dark bg-dark navbar-expand-lg'>
                <Link to='/student' className='navbar-brand'>AdapTest</Link>
                <div>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to='/student/taketest' className='nav-link'>Take Test</Link>
                        </li>
                        <li className='navbar-item'>
                            <button className='btn btn-dark' onClick={()=>{
                                window.location='/'
                            }}>Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}