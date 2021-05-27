import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai'
import RichTextEditor from 'react-rte';
import { FaArrowAltCircleRight } from 'react-icons/fa'

export default class TestTableRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.added) {
            return (
                <tr>
                    <td style={{ maxWidth: "320px" }}>
                        <RichTextEditor readOnly value={RichTextEditor.createValueFromString(this.props.question.questionBody, 'html')} />
                    </td>
                    <td><h2>{this.props.question.difficulty}</h2></td>
                    <td>
                        <button className='btn btn-light' onClick={()=>this.props.buttonFunction(this.props.question._id)}><AiFillCloseCircle /></button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td style={{ maxWidth: "320px" }}>
                        <RichTextEditor readOnly value={RichTextEditor.createValueFromString(this.props.question.questionBody, 'html')} />
                    </td>
                    <td><h2>{this.props.question.difficulty}</h2></td>
                    <td>
                        <button className='btn btn-light' onClick={()=>this.props.buttonFunction(this.props.question._id)}><FaArrowAltCircleRight /></button>
                    </td>
                </tr>
            )
        }
    }
}