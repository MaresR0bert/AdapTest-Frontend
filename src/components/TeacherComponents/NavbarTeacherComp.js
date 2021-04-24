import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FaArtstation, FaListAlt, FaUserTie} from 'react-icons/fa';
import {IoMdAddCircle} from 'react-icons/io';
import {AiOutlineDisconnect} from 'react-icons/ai'

export default class NavbarTeacher extends Component {
    render() {
        return (
            <div>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <Link to='/teacher' className='navbar-brand'><FaArtstation /> AdapTest</Link>
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className='navbar-nav mr-auto'>
                            <li className='navbar-item'>
                                <Link to='/teacher/question/add' className='nav-link'>Add Question <IoMdAddCircle /></Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/teacher/question/pool' className='nav-link'>My Question Pool <FaListAlt /></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className='navbar-item'>
                                <Link to='/teacher/' className='nav-link'><FaUserTie /> {this.props.username}</Link>
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
            </div>
        )
    }
}