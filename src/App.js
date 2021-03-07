import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogIn from './components/LogInComp.js';
import MainPageTeacher from './components/MainPageTeacherComp.js'
import MainPageStudent from './components/MainPageStudentComp.js'

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact component={LogIn} />
        <Route path='/teacher/' exact component={MainPageTeacher} />
        <Route path='/student/' exact component={MainPageStudent} />
      </Router>
    </div>
  );
}

export default App;
