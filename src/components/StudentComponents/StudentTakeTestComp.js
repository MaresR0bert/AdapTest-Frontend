import React, { Component } from 'react';
import axios from 'axios'
import ExerciseQuestion from './ExerciseQuestionComp.js'

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: [],
            score: 0,
            currentAnswerSelected: "",
            totalNrOfQuestions: 0,
            roomCode: "",
            joined: false
        };

        this.updateScore = this.updateScore.bind(this);
        this.onChangeRoomCode = this.onChangeRoomCode.bind(this);
        this.onJoinSubmit = this.onJoinSubmit.bind(this);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getQuestionBodyList() {
        return this.state.questionList.map(questionElem => {
            return questionElem.questionBody;
        });
    }

    onChangeRoomCode(event) {
        this.setState({
            roomCode: event.target.value
        })
    }

    async onJoinSubmit(event){
        event.preventDefault();
        await axios.get('http://localhost:3001/question/implicitanswersofuser/'+this.state.roomCode).then(res =>{
            if(!res.data.length){
                alert("Invalid Room Code!");
                window.location = '/student/'
            }

            this.setState({
                questionList: res.data,
                totalNrOfQuestions: res.data.length,
                joined: true
            });
        }).catch(error => {
            console.log(error);
        })
        
        const newTempLog = {
            username: this.props.username,
            questionArray: [],
            answers: [],
            score: 0
        }

        await axios.post('http://localhost:3001/templog/add',newTempLog).then(res =>{
            console.log(res.data);
        })
    }

    async updateScore(result, id) {
        if (result === 'Correct') {
            this.setState({
                score: this.state.score + 1,
                questionList: this.state.questionList.filter(question => question._id !== id)
            })
        } else {
            this.setState({
                score: this.state.score,
                questionList: this.state.questionList.filter(question => question._id !== id)
            })
        }
        console.log("Current Score: " + this.state.score);
        const updatedTempLog = {
            username: this.props.username,
            questionArray: this.state.questionList,
            answers: [],
            score: this.state.score
        }
        //await axios.put('http://localhost:3001/templog/')
    }

    render() {
        if (!this.state.joined) {
            return (
                <div className='container'>
                    <form onSubmit={this.onJoinSubmit}>
                        <h2>Input Test Code</h2>
                        <br />
                        <h5>code: </h5>
                        <input className='form-control' type="text" value={this.state.roomCode} onChange={this.onChangeRoomCode} />
                        <br/>
                        <br/>
                        <input className="btn btn-dark" type='submit' value="Join"/>
                    </form>
                </div>
            )
        } else {
            if (!this.state.questionList.length) {
                return (
                    <div className='container'>
                        <h2>{this.state.score}/{this.state.totalNrOfQuestions}</h2>
                    </div>
                )
            }
            let currentQuestion = this.state.questionList[this.getRandomInt(this.state.questionList.length)];
            if (currentQuestion) {
                return (
                    <div className='container'>
                        <ExerciseQuestion question={currentQuestion} currentAnswerSelected={this.state.currentAnswerSelected} key={currentQuestion._id} updateScore={this.updateScore} />
                    </div>
                )
            } else {
                return (
                    <div className='container'>
                        <h1>Loading...</h1>
                    </div>
                )
            }
        }
    }
}