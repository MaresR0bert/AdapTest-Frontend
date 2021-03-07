import React, { Component } from 'react';
import axios from 'axios';

export default class AddQuestionComp extends Component {
    constructor(props) {
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onChangeFakes = this.onChangeFakes.bind(this);
        this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            questionBody: '',
            rightAnswers: '',
            wrongAnswers: '',
            difficulty: 0,
            username: ''
        }
    }

    componentDidMount() {
        this.setState({
            username: 'r0bits'
        })
    }

    onChangeBody(event) {
        this.setState({
            questionBody: event.target.value
        })
    }

    onChangeAnswer(event) {
        this.setState({
            rightAnswers: event.target.value
        })
    }

    onChangeFakes(event) {
        this.setState({
            wrongAnswers: event.target.value
        })
    }

    onChangeDifficulty(event) {
        this.setState({
            difficulty: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        const newQuestion = {
            questionBody: this.state.questionBody,
            rightAnswers: this.state.rightAnswers,
            wrongAnswers: this.state.wrongAnswers,
            difficulty: this.state.difficulty,
            username: this.state.username,
        }

        console.log(newQuestion);

        axios.post('http://localhost:3001/question/add',newQuestion).then(res=>console.log(res.data));

        this.setState({
            questionBody: '',
            rightAnswers: '',
            wrongAnswers: '',
            difficulty: 0,
            username: ''
        })
    }

    render() {
        return (
            <div className='container' >
                <h1>Add Question:</h1>
                <form onSubmit={this.onSubmit}>
                    <h6>Question Body: </h6>
                    <textarea className='form-control' minLength='6' maxLength='512' value={this.state.body} onChange={this.onChangeBody} />
                    <br />
                    <h6>Right answer: </h6>
                    <input className='form-control' type='text' minLength='1' maxLength='64' value={this.state.answer} onChange={this.onChangeAnswer} />
                    <br />
                    <h6>Wrong answers: </h6>
                    <h6>*Separate wrong answers by ","</h6>
                    <input className='form-control' type='text' minLength='1' maxLength='256' value={this.state.fakes} onChange={this.onChangeFakes}/>
                    <br />
                    <h6>Set difficulty: </h6>
                    <input className='form-control' type='range' min='1' max='10' step='1' value={this.state.difficulty} onChange={this.onChangeDifficulty}/>
                    <br />
                    <input className="btn btn-dark" type='submit' />
                </form>
            </div>
        )
    }
}