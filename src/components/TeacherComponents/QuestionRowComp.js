import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import RichTextEditor from 'react-rte';

export default class QuestionRow extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let tempRightAnswers = "<ul>"
        for(let i of this.props.question.rightAnswers){
            tempRightAnswers +="<li>" + i + "</li>"
        }
        tempRightAnswers+="</ul>"

        let tempWrongAnswers = "<ul>"
        for(let i of this.props.question.wrongAnswers){
            tempWrongAnswers +="<li>" + i + "</li>"
        }
        tempWrongAnswers+="</ul>"

        return (
            <tr>
                <td style={{maxWidth:550}}>
                    <RichTextEditor readOnly value={RichTextEditor.createValueFromString(this.props.question.questionBody,'html')} />
                </td>
                <td>
                    <RichTextEditor readOnly value={RichTextEditor.createValueFromString(tempRightAnswers,'html')} />
                </td>
                <td>
                    <RichTextEditor readOnly value={RichTextEditor.createValueFromString(tempWrongAnswers,'html')} />
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