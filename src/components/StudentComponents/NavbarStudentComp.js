import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaArtstation, FaPenAlt, FaUserAstronaut, FaBook } from 'react-icons/fa';
import { AiOutlineDisconnect } from 'react-icons/ai';

export default class NavbarStudent extends Component {
    render() {
        return (
            <div>
                <nav className='navbar fixed-top navbar-expand-md navbar-dark bg-dark'>
                    <Link to='/student' className='navbar-brand'><FaArtstation /> aTestive</Link>
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className='navbar-nav mr-auto'>
                            <li className='navbar-item'>
                                <Link to='/student/taketest' className='nav-link'>Take Test <FaPenAlt /></Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/student/testhistory' className='nav-link'>Test History <FaBook /></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className='navbar-item'>
                                <Link to='/student/' className='nav-link'> <FaUserAstronaut /> {this.props.username}</Link>
                            </li>
                            <li className='navbar-item'>
                                <button className='btn btn-dark' onClick={() => {
                                    window.location = '/'
                                    localStorage.clear()
                                }}><AiOutlineDisconnect /> Log out</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br />
                <br />
                <br />
            </div>
        )
    }
}