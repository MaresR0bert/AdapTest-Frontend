import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/Navbar.js'
import AddUserComp from './components/AddUserComp.js'
import AddQuestionComp from './components/AddQuestionComp.js'

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/user/add' exact component={AddUserComp} />
      <Route path='/question/add' exact component={AddQuestionComp} />
    </Router>
  );
}

export default App;
