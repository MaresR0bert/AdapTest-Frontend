import React, { Component } from 'react';
import axios from 'axios';

export default class EditQuestionComp extends Component {
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

    async componentDidMount() {
        await axios.get('http://localhost:3001/question/'+this.props.match.params.id).then(response => {
            this.setState({
                questionBody: response.data.questionBody,
                rightAnswers: response.data.rightAnswers,
                wrongAnswers: response.data.wrongAnswers,
                difficulty: response.data.difficulty,
                username: response.data.username
            })
        }).catch(error =>{
            console.log(error)
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

    async onSubmit(event) {
        event.preventDefault();
        const newQuestion = {
            questionBody: this.state.questionBody,
            rightAnswers: this.state.rightAnswers,
            wrongAnswers: this.state.wrongAnswers,
            difficulty: this.state.difficulty,
            username: this.state.username,
        }

        console.log(newQuestion);

        await axios.put('http://localhost:3001/question/update/'+this.props.match.params.id,newQuestion).then(res=>console.log(res.data));

        this.setState({
            questionBody: '',
            rightAnswers: '',
            wrongAnswers: '',
            difficulty: 0,
            username: ''
        })

        window.location = '/teacher/'
    }

    render() {
        return (
            <div className='container' >
                <h1>Edit Question:</h1>
                <form onSubmit={this.onSubmit}>
                    <h6>Question Body: </h6>
                    <textarea className='form-control' minLength='6' maxLength='512' value={this.state.questionBody} onChange={this.onChangeBody} />
                    <br />
                    <h6>Right answer: </h6>
                    <input className='form-control' type='text' minLength='1' maxLength='128' value={this.state.rightAnswers} onChange={this.onChangeAnswer} />
                    <br />
                    <h6>Wrong answers: </h6>
                    <h6>*Separate wrong answers by ","</h6>
                    <input className='form-control' type='text' minLength='1' maxLength='512' value={this.state.wrongAnswers} onChange={this.onChangeFakes}/>
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