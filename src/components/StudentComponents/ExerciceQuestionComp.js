import React, { Component } from 'react';

export default class ExerciceQuestion extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    populateRightAnswers() {
        let rightAnswersArray = this.props.question.rightAnswers.split(',');
        return rightAnswersArray.map(answerElem => {
            return <div><label><input type='radio' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label><br /></div>
        })
    }

    populateWrongAnswers() {
        let wrongAnswersArray = this.props.question.wrongAnswers.split(',');
        return wrongAnswersArray.map(answerElem => {
            return <div><label><input type='radio' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label><br /></div>
        })
    }

    onSubmit(event){
        console.log('submit done')
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>{this.props.question.questionBody}</h3>
                <div>
                    {this.populateRightAnswers()}
                </div>
                <div>
                    {this.populateWrongAnswers()}
                </div>
                <input type='submit' className="btn btn-dark" />
            </form>
        )
    }
}