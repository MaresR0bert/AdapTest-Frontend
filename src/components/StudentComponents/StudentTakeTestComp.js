import React, { Component } from 'react';
import axios from 'axios'
import ExerciceQuestion from './ExerciceQuestionComp.js'

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: [],
            score: 0
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/question/').then(res => {
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
                    <ExerciceQuestion question={currentQuestion}/>
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