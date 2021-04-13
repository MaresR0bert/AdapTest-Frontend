import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact component={LogIn} />
        <Route path='/register/' exact component={AddUserComp} />

        <Route path={['/teacher/','/teacher/question/add','/teacher/question/pool','/teacher/question/edit/:id']} exact component={NavbarTeacher} />
        <Route path='/teacher/' exact component={MainPageTeacher} />
        <Route path='/teacher/question/add' exact component={AddQuestionComp} />
        <Route path='/teacher/question/pool' exact component={QuestionPool} />
        <Route path='/teacher/question/edit/:id' component={EditQuestionComp} />

        <Route path={['/student', '/student/taketest']} exact component={NavbarStudent} />
        <Route path='/student/' exact component={MainPageStudent} />
        <Route path='/student/taketest' exact component={StudentTakeTest} />

      </Router>
    </div>
  );
}

export default App;
