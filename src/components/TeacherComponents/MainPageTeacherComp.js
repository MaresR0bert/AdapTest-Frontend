import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavbarTeacher from './NavbarTeacherComp.js'
import AddUserComp from '../ServiceComponents/AddUserComp.js'
import AddQuestionComp from './AddQuestionComp.js'
import QuestionPool from './QuestionPoolComp.js';

export default class MainPageTeacher extends Component {
    render() {
        return (
            <Router>
                <NavbarTeacher />
                <Route path='/teacher/user/add' exact component={AddUserComp} />
                <Route path='/teacher/question/add' exact component={AddQuestionComp} />
                <Route path='/teacher/question/pool' exact component={QuestionPool} />
            </Router>
        )
    }
}