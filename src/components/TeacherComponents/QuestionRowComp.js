import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FaTrashAlt, FaEdit} from 'react-icons/fa'

export default class QuestionRow extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <tr>

                <td>{this.props.question.questionBody}</td>
                <td>{this.props.question.rightAnswers}</td>
                <td>{this.props.question.wrongAnswers}</td>
                <td>{this.props.question.difficulty}</td>
                <td>
                    <Link to={'/teacher/question/edit/'+this.props.question._id}><button className='btn btn-light'><FaEdit /></button></Link>
                </td>
                <td>
                    <button className='btn btn-light' onClick={() => this.props.deleteQuestion(this.props.question._id)}><FaTrashAlt /></button>
                </td>
            </tr>
        )
    }
}