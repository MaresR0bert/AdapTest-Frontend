import React, { Component } from 'react';
import axios from 'axios'
import ExerciseQuestion from './ExerciseQuestionComp.js'

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: [],
            score: 0,
            currentAnswerSelected:"",
            totalNrOfQuestions:0
        };

        this.updateScore = this.updateScore.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:3001/question/implicitanswers').then(res => {
            this.setState({
                questionList: res.data,
                totalNrOfQuestions: res.data.length
            })
        }).catch(error => {
            console.log(error);
        })
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getQuestionBodyList() {
        return this.state.questionList.map(questionElem => {
            return questionElem.questionBody;
        });
    }

    updateScore(result, id){
        if(result === 'Correct'){
            this.setState({
                score: this.state.score+1,
                questionList: this.state.questionList.filter(question => question._id !== id)
            })
        }else{
            this.setState({
                score: this.state.score,
                questionList: this.state.questionList.filter(question => question._id !== id)
            })
        }
        console.log("Current Score: "+this.state.score);
    }

    render() {
        if(!this.state.questionList.length){
            return(
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