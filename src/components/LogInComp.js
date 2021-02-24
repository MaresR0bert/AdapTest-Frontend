import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Navbar.js'
import AddUserComp from './AddUserComp.js'
import AddQuestionComp from './AddQuestionComp.js'
import MainPageTeacher from './MainPageTeacherComp.js';

export default class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    render() {
        if (this.state.status === true) window.location = '/teacher/'; 
        else if(this.state.status === false) window.location = '/student/'

        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        status: true
                    })
                }}>Teacher</button>
                <br/>
                <button onClick={() => {
                    this.setState({
                        status: false
                    })
                }}>Student</button>
            </div>
        )
    }
}

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