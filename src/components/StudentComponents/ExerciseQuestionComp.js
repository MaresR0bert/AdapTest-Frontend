import React, { Component } from 'react';

export default class ExerciseQuestion extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    populateAnswers() {
        let answerArray = this.props.question.answers.split(',');
        return answerArray.map(answerElem => {
            return <div><label><input type='radio' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label><br /></div>
        })
    }

    onSubmit(event){
        event.preventDefault();
        console.log('submit done')
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>{this.props.question.questionBody}</h3>
                <div>
                    {this.populateAnswers()}
                </div>
                <input type='submit' className="btn btn-dark" />
            </form>
        )
    }
}