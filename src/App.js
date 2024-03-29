import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import LogIn from './components/ServiceComponents/LogInComp.js';
import MainPageTeacher from './components/TeacherComponents/MainPageTeacherComp.js'
import MainPageStudent from './components/StudentComponents/MainPageStudentComp.js'
import AddUserComp from './components/ServiceComponents/AddUserComp.js';
import NavbarTeacher from './components/TeacherComponents/NavbarTeacherComp.js';
import NavbarStudent from './components/StudentComponents/NavbarStudentComp.js';
import StudentTakeTest from './components/StudentComponents/StudentTakeTestComp.js'
import AddQuestionComp from './components/TeacherComponents/AddQuestionComp.js'
import QuestionPool from './components/TeacherComponents/QuestionPoolComp.js';
import EditQuestionComp from './components/TeacherComponents/EditQuestionComp.js';
import TestHistory from './components/StudentComponents/TestHistoryComp.js';
import CreateTest from './components/TeacherComponents/CreateTestComp.js';
import TestList from './components/TeacherComponents/TestListComp.js';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "default",
      role: "default",
      _id: "default"
    }

    this.onSetUser = this.onSetUser.bind(this)
  }

  componentDidMount() {
    this.setState({
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      _id: localStorage.getItem('_id')
    })
  }

  onSetUser(user, userRole, id) {
    localStorage.setItem('username', user)
    localStorage.setItem('role', userRole)
    localStorage.setItem('_id', id)
    this.setState({
      username: user,
      role: userRole,
      _id: id
    })
  }

  render() {
    if (this.state.role === "teacher") {
      return (
        <div>
          <Router>
            <Route path={['/teacher/', '/teacher/question/add', '/teacher/question/pool', '/teacher/question/edit/:id','/teacher/createtest/','/teacher/testlist/']} exact>
              <NavbarTeacher username={this.state.username} _id={this.state._id} />
            </Route>
            <Route path='/teacher/' exact>
              <MainPageTeacher username={this.state.username} />
            </Route>
            <Route path='/teacher/createtest/' exact>
              <CreateTest username={this.state.username} />
            </Route>
            <Route path='/teacher/question/add' exact>
              <AddQuestionComp username={this.state.username} />
            </Route>
            <Route path='/teacher/question/pool' exact>
              <QuestionPool username={this.state.username} />
            </Route>
            <Route path='/teacher/question/edit/:id' component={EditQuestionComp} />
            <Route path='/teacher/testlist/' exact>
              <TestList username={this.state.username} />
            </Route>
            <Redirect to='/teacher/' />
          </Router>
        </div>
      );
    } else if (this.state.role === "student") {
      return (
        <div>
          <Router>
            <Route path={['/student', '/student/taketest','/student/testhistory']} exact>
              <NavbarStudent username={this.state.username} _id={this.state._id} />
            </Route>
            <Route path='/student/' exact>
              <MainPageStudent username={this.state.username} />
            </Route>
            <Route path='/student/taketest' exact>
              <StudentTakeTest username={this.state.username} />
            </Route>
            <Route path='/student/testhistory' exact>
              <TestHistory username={this.state.username} />
            </Route>
            <Redirect to='/student/' />
          </Router>
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <Route path='/' exact>
              <LogIn setUser={this.onSetUser} />
            </Route>
            <Route path='/register/' exact component={AddUserComp} />
          </Router>
        </div>
      )
    }
  }
}
