import axios from 'axios';
import React, { Component } from 'react';

export default class ExerciseQuestion extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        //this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.onChangeMultipleAnswers = this.onChangeMultipleAnswers.bind(this);

        this.state = {
            currentAnswerSelected: "",
            currentSelectedCheckboxes: []
        }
    }

    populateAnswers() {
        return this.props.question.answers.map(answerElem => {
            return <div><label><input type='radio' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label><br /></div>
        })
    }

    populateMultiAnswers() {
        return this.props.question.answers.map(answerElem => {
            return <div><label><input type='checkbox' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label></div>
        })
    }

    async onSubmit(event) {
        event.preventDefault();
        console.log('submit done')
        console.log('Selected answer: ' + this.state.currentAnswerSelected);
        console.log('Question ID: ' + this.props.question._id)

        let answerPackage;
        if (this.props.question.isMultiAnswer) {
            answerPackage = {
                answer: this.state.currentSelectedCheckboxes
            }
        } else {
            answerPackage = {
                answer: [this.state.currentAnswerSelected]
            }
        }

        console.log(answerPackage);
        await axios.post('http://localhost:3001/question/check/' + this.props.question._id, answerPackage).then(res => {
            console.log(res.data);
            this.props.updateScore(res.data, this.props.question._id, answerPackage.answer)
        })
    }

    onChangeValue(event) {
        this.setState({
            currentAnswerSelected: event.target.value
        })
    }

    onChangeMultipleAnswers(event) {
        let tempIndex = this.state.currentSelectedCheckboxes.indexOf(event.target.value);
        if (tempIndex !== -1) {
            let tempArray = this.state.currentSelectedCheckboxes;
            tempArray.splice(tempIndex, 1);
            console.log(tempArray);
            this.setState({
                currentSelectedCheckboxes: tempArray
            })
        } else {
            let tempArray = this.state.currentSelectedCheckboxes;
            tempArray.push(event.target.value)
            console.log(tempArray);
            this.setState({
                currentSelectedCheckboxes: tempArray
            })
        }
    }

    render() {
        if (!this.props.question.isMultiAnswer) {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="jumbotron">
                        <h3>{this.props.questionCounter}. {this.props.question.questionBody}</h3>
                        <br />
                        <div onChange={this.onChangeValue}>
                            {this.populateAnswers()}
                        </div>
                        <div className='text-right'>
                            <input type='submit' className="btn btn-dark" />
                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="jumbotron">
                        <h3>{this.props.questionCounter}. {this.props.question.questionBody}</h3>
                        <br />
                        <div onChange={this.onChangeMultipleAnswers}>
                            {this.populateMultiAnswers()}
                        </div>
                        <div className='text-right'>
                            <input type='submit' className='btn btn-dark' />
                        </div>
                    </div>
                </form>
            )
        }
    }
}