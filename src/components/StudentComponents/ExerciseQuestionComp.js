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

    populateMultiAnswers(){
        return this.props.question.answers.map(answerElem =>{
            return <div><label><input type='checkbox' name='answers' className='form-check-input' value={answerElem} />{answerElem}</label></div>
        })
    }

    async onSubmit(event) {
        event.preventDefault();
        console.log('submit done')
        console.log('Selected answer: ' + this.state.currentAnswerSelected);
        console.log('Question ID: ' + this.props.question._id)

        let answerPackage;
        if(this.props.question.isMultiAnswer){
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
        if(tempIndex !== -1){
            let tempArray = this.state.currentSelectedCheckboxes;
            tempArray.splice(tempIndex,1);
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

    // toggleCheckBox(label){
    //     let n = this.state.currentSelectedCheckboxes.indexOf(label)
    //     console.log(n)
    //     if(n !== -1){
    //         const index = this.state.currentSelectedCheckboxes.indexOf(label);
    //         const tempArray = this.state.currentSelectedCheckboxes.splice(index,1);
    //         console.log(tempArray)
    //         this.setState({
    //             currentSelectedCheckboxes: tempArray
    //         })
    //     } else {
    //         let tempArray = this.state.currentSelectedCheckboxes
    //         tempArray.push(label)
    //         console.log(tempArray)
    //         this.setState({
    //             currentSelectedCheckboxes: tempArray
    //         })
    //     }
    //     console.log(this.state.currentSelectedCheckboxes) 
    // }

    render() {
        if (!this.props.question.isMultiAnswer) {
            return (
                <form onSubmit={this.onSubmit}>
                    <h3>{this.props.question.questionBody}</h3>
                    <div onChange={this.onChangeValue}>
                        {this.populateAnswers()}
                    </div>
                    <input type='submit' className="btn btn-dark" />
                </form>
            )
        } else {
            return(
                <form onSubmit={this.onSubmit}>
                    <h3>{this.props.question.questionBody}</h3>
                    <div onChange={this.onChangeMultipleAnswers}>
                        {this.populateMultiAnswers()}
                    </div>
                    <input type='submit' className='btn btn-dark' />
                </form>
            )
        }
    }
}