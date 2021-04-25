import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import RichTextEditor from 'react-rte';

export default class QuestionRow extends Component {
    constructor(props) {
        super(props)

        this.populateAnswers = this.populateAnswers.bind(this);
    }

    populateAnswers(array){
        return array.map(answerElem =>{
            return <li>{answerElem}</li>
        })
    }

    render() {
        return (
            <tr>
                <td style={{maxWidth:400}}>
                    <RichTextEditor readOnly value={RichTextEditor.createValueFromString(this.props.question.questionBody,'html')} />
                </td>
                <td>
                    <ul>
                        {this.populateAnswers(this.props.question.rightAnswers)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {this.populateAnswers(this.props.question.wrongAnswers)}
                    </ul>
                </td>
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