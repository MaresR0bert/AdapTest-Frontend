import React, { Component } from 'react';

export default class QuestionRow extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
           <tr>
               <td>{this.props.question.body}</td>
               <td>{this.props.question.answer}</td>
               <td>{this.props.question.fakes}</td>
               <td>{this.props.question.difficulty}</td>
           </tr>
        )
    }
}