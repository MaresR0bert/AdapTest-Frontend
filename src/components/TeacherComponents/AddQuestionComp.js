import React, { Component } from 'react';
import axios from 'axios';
import RichTextEditor from 'react-rte';

export default class AddQuestionComp extends Component {
    constructor(props) {
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeRightAnswer = this.onChangeRightAnswer.bind(this);
        this.onChangeWrongAnswers = this.onChangeWrongAnswers.bind(this);
        this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            questionBody: RichTextEditor.createEmptyValue(),
            rightAnswers: [],
            wrongAnswers: [],
            difficulty: 0,
            username: ''
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.username
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

    async onSubmit(event) {
        event.preventDefault();
        const newQuestion = {
            questionBody: this.state.questionBody.toString('html'),
            rightAnswers: this.state.rightAnswers,
            wrongAnswers: this.state.wrongAnswers,
            difficulty: this.state.difficulty,
            username: this.state.username,
        }

        console.log(newQuestion);

        await axios.post('http://localhost:3001/question/add',newQuestion).then(res=>console.log(res.data));

        this.setState({
            questionBody: RichTextEditor.createEmptyValue(),
            rightAnswers: [],
            wrongAnswers: [],
            difficulty: 0,
        })
    }

    render() {
        return (
            <div className='container' >
                <h1>Add Question:</h1>
                <form onSubmit={this.onSubmit}>
                    <h6>Question Body: </h6>
                    <RichTextEditor value={this.state.questionBody} onChange={this.onChangeBody} />
                    <br />
                    <h6>Right answer: </h6>
                    <input className='form-control' type='text' minLength='1' maxLength='128' value={this.state.rightAnswers} onChange={this.onChangeRightAnswer} />
                    <br />
                    <h6>Wrong answers: </h6>
                    <h6>*Separate wrong answers by ","</h6>
                    <input className='form-control' type='text' minLength='1' maxLength='512' value={this.state.wrongAnswers} onChange={this.onChangeWrongAnswers}/>
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