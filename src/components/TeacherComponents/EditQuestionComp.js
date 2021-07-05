import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import RichTextEditor from 'react-rte';

export default class EditQuestionComp extends Component {
    constructor(props) {
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeRightAnswer = this.onChangeRightAnswer.bind(this);
        this.onChangeWrongAnswers = this.onChangeWrongAnswers.bind(this);
        this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeProgLang = this.onChangeProgLang.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);

        this.state = {
            questionBody: RichTextEditor.createEmptyValue(),
            rightAnswers: [],
            wrongAnswers: [],
            difficulty: 0,
            username: '',
            done: false,
            questionCode: '',
            questionProgLang: '',
            questionCategory: ''
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:3001/question/getbyid/' + this.props.match.params.id).then(response => {
            this.setState({
                questionBody: RichTextEditor.createValueFromString(response.data.questionBody, 'html'),
                rightAnswers: response.data.rightAnswers,
                wrongAnswers: response.data.wrongAnswers,
                difficulty: response.data.difficulty,
                username: response.data.username,
                questionCode: response.data.questionCode,
                questionProgLang: response.data.questionProgLang,
                questionCategory: response.data.questionCategory
            })
        }).catch(error => {
            console.log(error)
        })
    }

    onChangeBody(event) {
        this.setState({
            questionBody: event
        })
    }

    onChangeRightAnswer(event) {
        let rightAnswersArray = event.target.value.split(",");
        this.setState({
            rightAnswers: rightAnswersArray
        })
    }

    onChangeWrongAnswers(event) {
        let wrongAnswersArray = event.target.value.split(",");
        this.setState({
            wrongAnswers: wrongAnswersArray
        })
    }

    onChangeDifficulty(event) {
        this.setState({
            difficulty: event.target.value
        })
    }

    onChangeCode(event) {
        this.setState({
            questionCode: event.target.value
        })
    }

    onChangeProgLang(event) {
        this.setState({
            questionProgLang: event.target.value
        })
    }

    onChangeCategory(event) {
        this.setState({
            questionCategory: event.target.value
        })
    }

    async onSubmit(event) {
        event.preventDefault();
        const newQuestion = {
            questionBody: this.state.questionBody.toString('html'),
            rightAnswers: this.state.rightAnswers,
            wrongAnswers: this.state.wrongAnswers,
            difficulty: this.state.difficulty,
            username: this.state.username,
            questionCode: this.state.questionCode,
            questionProgLang: this.state.questionProgLang,
            questionCategory: this.state.questionCategory
        }

        console.log(newQuestion);

        await axios.put('http://localhost:3001/question/update/' + this.props.match.params.id, newQuestion).then(res => console.log(res.data));

        this.setState({
            done: true
        })
    }

    render() {
        if (this.state.done) {
            return (
                <Redirect to='/teacher/question/pool' />
            )
        } else {
            return (
                <div className='container' >
                    <h1>Edit Question:</h1>
                    <form onSubmit={this.onSubmit}>
                        <h6>Question Body: </h6>
                        <RichTextEditor value={this.state.questionBody} onChange={this.onChangeBody} />
                        <br />
                        <h6>Question Code:</h6>
                        <textarea className='form-control' value={this.state.questionCode} onChange={this.onChangeCode} />
                        <br />
                        <h6>Programming Language:</h6>
                        <select required className='form-control' value={this.state.questionProgLang} onChange={this.onChangeProgLang} title='Programming Language'>
                            <option value=''>Choose Programming Language</option>
                            <option value='c'>C</option>
                            <option value='cpp'>C++</option>
                            <option value='sql'>SQL</option>
                            <option value='csharp'>C#</option>
                            <option value='python'>Python</option>
                            <option value='java'>Java</option>
                            <option value='javascript'>JavaScript</option>
                        </select>
                        <br />
                        <h6>Right answer: </h6>
                        <input className='form-control' type='text' minLength='1' maxLength='128' value={this.state.rightAnswers} onChange={this.onChangeRightAnswer} />
                        <br />
                        <h6>Wrong answers: </h6>
                        <h6>*Separate wrong answers by ","</h6>
                        <input className='form-control' type='text' minLength='1' maxLength='512' value={this.state.wrongAnswers} onChange={this.onChangeWrongAnswers} />
                        <br />
                        <h6>Set difficulty: </h6>
                        <input className='form-control' type='range' min='1' max='10' step='1' value={this.state.difficulty} onChange={this.onChangeDifficulty} />
                        <br />
                        <h6>Category: </h6>
                        <select required className='form-control' value={this.state.questionCategory} onChange={this.onChangeCategory} title='Question Category'>
                            <option value=''>Choose Category</option>
                            <option value='oop'>OOP</option>
                            <option value='ds'>Data Structures</option>
                            <option value='java'>Java</option>
                            <option value='sqt'>Software Quality and Testing</option>
                        </select>
                        <br />
                        <input className="btn btn-dark" type='submit' />
                    </form>
                </div>
            )
        }
    }
}