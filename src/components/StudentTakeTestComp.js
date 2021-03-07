import React, { Component } from 'react';
import axios from 'axios'

export default class StudentTakeTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionList: []
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

    getQuestionList(){
        return this.state.questionList.map(questionElem=>{
            return questionElem.questionBody;
        });
    }

    render() {
        return (
            <div className='container'>
                {console.log(this.state.questionList)}
                <div>{this.getQuestionList()}</div>
            </div>
        )
    }
}