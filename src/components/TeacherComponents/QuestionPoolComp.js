import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QuestionRow from './QuestionRowComp';

export default class QuestionPool extends Component {
    constructor(props) {
        super(props);

        this.deleteQuestion = this.deleteQuestion.bind(this);

        this.state = {
            questionList: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/question/').then(res => {
            //console.log(res.data);
            this.setState({
                questionList: res.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    deleteQuestion(id) {
        axios.delete('http://localhost:3001/question/' + id).then(res => {
            console.log(res.data);
        });

        this.setState({
            questionList: this.state.questionList.filter(question => question._id !== id)
        })
    }

    getQuestionList(){
        return this.state.questionList.map(questionElem =>{
            return <QuestionRow question={questionElem} />
        })
    }

    render() {
        return (
            <div className='container'>
                <h3>Your pool:</h3>
                {console.log(this.state.questionList)}
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Question Body</th>
                            <th>Correct Answer/Answers</th>
                            <th>Wrong Answers</th>
                            <th>Difficulty level (1-10)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getQuestionList()}
                    </tbody>
                </table>
            </div>
        )
    }
}