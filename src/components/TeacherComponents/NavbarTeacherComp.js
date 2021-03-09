import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarTeacher extends Component {
    render() {
        return (
            <nav className='nav navbar-dark bg-dark navbar-expand-lg'>
                <Link to='/teacher' className='navbar-brand'>AdapTest</Link>
                <div>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to='/teacher/user/add' className='nav-link'>Register User</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/teacher/question/add' className='nav-link'>Add Question</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/teacher/question/pool' className='nav-link'>My Question Pool</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}