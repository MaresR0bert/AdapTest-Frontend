import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogIn from './components/ServiceComponents/LogInComp.js';
import MainPageTeacher from './components/TeacherComponents/MainPageTeacherComp.js'
import MainPageStudent from './components/StudentComponents/MainPageStudentComp.js'
import AddUserComp from './components/ServiceComponents/AddUserComp.js';

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact component={LogIn} />
        <Route path='/teacher/' exact component={MainPageTeacher} />
        <Route path='/student/' exact component={MainPageStudent} />
        <Route path='/register/' exact component={AddUserComp} />
      </Router>
    </div>
  );
}

export default App;
