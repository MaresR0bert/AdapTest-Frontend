import React, { Component } from 'react';
import axios from 'axios';
import ExerciseQuestion from './ExerciseQuestionComp.js';
import {IoArrowBack} from 'react-icons/io5';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: [],
            score: 0,
            totalNrOfQuestions: 0,
            roomCode: "",
            joined: 0,
            questionListDone: [],
            givenAnswers: []
        };

        this.updateScore = this.updateScore.bind(this);
        this.onChangeRoomCode = this.onChangeRoomCode.bind(this);
        this.onJoinSubmit = this.onJoinSubmit.bind(this);
    }

    async componentDidMount() {
        await axios.get("http://localhost:3001/templog/getbyname/" + this.props.username).then(res => {
            if (res.data) {
                console.log("first")
                console.log(res.data)
                this.setState({
                    questionList: res.data.questionArrayRemaining,
                    joined: 0,
                    score: res.data.score,
                    totalNrOfQuestions: res.data.questionArrayDone.length + res.data.questionArrayRemaining.length,
                    roomCode: res.data.roomCode,
                    questionListDone: res.data.questionArrayDone,
                    givenAnswers: res.data.givenAnswers
                })
            }
        })


        if (this.state.questionList.length) {
            alert('You were reconnected to your test')
            const questionIdsToSend = {
                ids: this.state.questionList
            }

            await axios.post("http://localhost:3001/question/getbymanyids/", questionIdsToSend).then(result => {
                if (result.data.length) {
                    this.setState({
                        questionList: result.data,
                        joined: 1
                    })
                }
            })
        }
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

    async onJoinSubmit(event) {
        let isRoomCodeCorrect = true;
        event.preventDefault();
        await axios.get('http://localhost:3001/question/implicitanswersofuser/' + this.state.roomCode).then(res => {
            if (!res.data.length) {
                alert("Invalid Room Code!");
                window.location = '/student/'
                isRoomCodeCorrect = false
            }

            this.setState({
                questionList: res.data,
                totalNrOfQuestions: res.data.length,
                joined: 1
            });
        }).catch(error => {
            console.log(error);
        })

        if (isRoomCodeCorrect) {
            const newTempLog = {
                username: this.props.username,
                roomCode: this.state.roomCode,
                questionArrayRemaining: this.state.questionList.map(question => question._id),
                questionArrayDone: [],
                answers: [],
                score: 0
            }

            await axios.post('http://localhost:3001/templog/add', newTempLog).then(res => {
                console.log(res.data);
            })
        }
    }

    async updateScore(result, id, answerGiven) {
        this.setState({
            score: this.state.score + (result === 'Correct' ? 1 : 0),
            questionList: this.state.questionList.filter(question => question._id !== id),
            questionListDone: this.state.questionListDone.concat([id]),
            givenAnswers: this.state.givenAnswers.concat([answerGiven])
        })

        console.log("Current Score: " + this.state.score);

        const updatedTempLog = {
            questionArrayRemaining: this.state.questionList.map(question => question._id),
            questionArrayDone: this.state.questionListDone,
            givenAnswers: this.state.givenAnswers,
            score: this.state.score
        }

        if (this.state.questionList.length) {
            await axios.put('http://localhost:3001/templog/updatebyname/' + this.props.username, updatedTempLog).then(res => {
                console.log(res.data);
            })
        } else {
            console.log("nothing more called")
            this.setState({
                joined: 2
            })
            await axios.delete('http://localhost:3001/templog/deletebyname/' + this.props.username).then(res => {
                console.log(res.data);
            })
        }
    }

    render() {
        if (!this.state.joined) {
            return (
                <div className='container'>
                    <div className='jumbotron'>
                        <form onSubmit={this.onJoinSubmit}>
                            <h2 className='text-center'>Enter Test Code</h2>
                            <br />
                            <h5>code: </h5>
                            <input className='form-control' type="text" placeholder="Room Code" value={this.state.roomCode} onChange={this.onChangeRoomCode} />
                            <br />
                            <br />
                            <input className="btn btn-dark btn-lg btn-block" type='submit' value="Join" />
                        </form>
                    </div>
                </div>
            )
        } else {
            if (this.state.joined === 2) {
                return (
                    <div className='container'>
                        <div className='jumbotron'>
                            <div className='jumbotron'>
                                <h2 className='text-center'>You scored {this.state.score} out of {this.state.totalNrOfQuestions}, which is equivalent to {this.state.score / this.state.totalNrOfQuestions * 100}%</h2>
                            </div>
                            <div className='col text-center'>
                                <button className="btn btn-dark" onClick={() => {
                                    window.location = '/student'
                                }}><IoArrowBack /> Back</button>
                            </div>
                        </div>
                    </div>
                )
            }
            let currentQuestion = this.state.questionList[this.getRandomInt(this.state.questionList.length)];
            if (currentQuestion && this.state.joined === 1) {
                return (
                    <div className="container">
                        <div className='jumbotron'>
                            <h4 className='align-baseline'>Question {this.state.questionListDone.length + 1} out of {this.state.totalNrOfQuestions} </h4>
                            <ExerciseQuestion question={currentQuestion} key={currentQuestion._id} questionCounter={this.state.questionListDone.length + 1} updateScore={this.updateScore} />
                        </div>
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