import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class QuestionRow extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <tr>
                <td>
                    <button className='btn btn-dark' onClick={() => this.props.deleteQuestion(this.props.question._id)}>X</button>
                    <Link to={'/teacher/question/edit/'+this.props.question._id}><button className='btn btn-dark'>edit</button></Link>
                </td>
                <td>{this.props.question.questionBody}</td>
                <td>{this.props.question.rightAnswers}</td>
                <td>{this.props.question.wrongAnswers}</td>
                <td>{this.props.question.difficulty}</td>
            </tr>
        )
    }
}