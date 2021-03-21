import React, { Component } from 'react';
import axios from 'axios'
import ExerciseQuestion from './ExerciseQuestionComp.js'

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: [],
            score: 0,
            currentAnswerSelected:"lamyo"
        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:3001/question/implicitanswers').then(res => {
            this.setState({
                questionList: res.data
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

    render() {
        let currentQuestion = this.state.questionList[this.getRandomInt(this.state.questionList.length)];
        if (currentQuestion) {
            return (
                <div className='container'>
                    <ExerciseQuestion question={currentQuestion} currentAnswerSelected={this.state.currentAnswerSelected}/>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }

    }
}