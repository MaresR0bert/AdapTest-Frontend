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
            username: '',
            body: '',
            answer: '',
            fakes: '',
            difficulty: 0,
        }
    }

    componentDidMount() {
        this.setState({
            username: 'r0bits'
        })
    }

    onChangeBody(event) {
        this.setState({
            body: event.target.value
        })
    }

    onChangeAnswer(event) {
        this.setState({
            answer: event.target.value
        })
    }

    onChangeFakes(event) {
        this.setState({
            fakes: event.target.value
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
            username: this.state.username,
            body: this.state.body,
            answer: this.state.answer,
            fakes: this.state.fakes,
            difficulty: this.state.difficulty
        }

        console.log(newQuestion);

        axios.post('http://localhost:8080/question/add',newQuestion).then(res=>console.log(res.data));

        this.setState({
            username: '',
            body: '',
            answer: '',
            fakes: '',
            difficulty: 0,
        })
    }

    render() {
        return (
            <div className='container' >
                <h1>Add Question:</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Question Body: </label>
                    <br />
                    <textarea style={{width:500}} value={this.state.body} onChange={this.onChangeBody} />
                    <br />
                    <label>Right answer: </label>
                    <input type='text' value={this.state.answer} onChange={this.onChangeAnswer} />
                    <br />
                    <label>Wrong answers: </label>
                    <input type='text' value={this.state.fakes} onChange={this.onChangeFakes}/>
                    <label>*Separate wrong answers by ","</label>
                    <br />
                    <label>Set difficulty: </label>
                    <input type='range' min='1' max='10' step='1' style={{ verticalAlign: 'middle' }} value={this.state.difficulty} onChange={this.onChangeDifficulty}/>
                    <br />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}