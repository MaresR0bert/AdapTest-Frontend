import axios from 'axios';
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

    async onSubmit(event){
        event.preventDefault();
        console.log('submit done')
        console.log('Selected answer: '+this.state.currentAnswerSelected);
        console.log('Question ID: '+this.props.question._id)

        const answerPackage = {
            answer: this.state.currentAnswerSelected
        }

        await axios.post('http://localhost:3001/question/check/'+this.props.question._id,answerPackage).then(res=>{
            console.log(res.data);
            this.props.updateScore(res.data,this.props.question._id)
        })
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