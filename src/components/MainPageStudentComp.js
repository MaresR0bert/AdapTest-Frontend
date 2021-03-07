import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavbarStudent from './NavbarStudentComp.js'
import StudentTakeTest from './StudentTakeTestComp.js'


export default class MainPageStudent extends Component {
    render() {
        return (
            <Router>
                <NavbarStudent />
                <Route path='/student/taketest' exact component={StudentTakeTest} />
            </Router>
        )
    }
}