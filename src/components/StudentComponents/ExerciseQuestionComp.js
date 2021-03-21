import React, { Component } from 'react';

export default class ExerciseQuestion extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);

        this.state={
            currentAnswerSelected:""
        }
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
        console.log(this.state.currentAnswerSelected);
    }

    onChangeValue(event){
        this.setState({
            currentAnswerSelected: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>{this.props.question.questionBody}</h3>
                <div onChange={this.onChangeValue}>
                    {this.populateAnswers()}
                </div>
                <input type='submit' className="btn btn-dark" />
            </form>
        )
    }
}