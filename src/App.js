import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from './components/MainPageComp.js';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <MainPage></MainPage>
    /* 
    constructor(props){
      super(props)
      this.state = {
        status:0
      }
    }
    
    render(){
      if(this.state.status === 1){
        return <MainPageTeacher />
      }else if(this.state.status === 2) return <MainPageStudent />

      return(
        <div>
          <input>username</input>
          <button onClick={()=>{
            this.setState({
              status:2
            })
          }}>Log In As Student</button>

          <button onClick={()=>{
            this.setState({
              status:1
            })
          }}>Log In As Teacher</button>
        </div>
      )
    }
    */
  );
}

export default App;
