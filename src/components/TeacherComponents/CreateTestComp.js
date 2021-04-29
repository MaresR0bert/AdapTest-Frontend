import React, { Component } from 'react';
import axios from 'axios';
import TestTableRow from './TestTableRowComp.js';

export default class CreateTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomCode: "",
            questionList: [],
            addedQuestionList: []
        };

        this.getQuestionList = this.getQuestionList.bind(this);
        this.addQuestionToTest = this.addQuestionToTest.bind(this);
        this.removeQuestionFromTest = this.removeQuestionFromTest.bind(this);
        this.sumbitTestCreation = this.sumbitTestCreation.bind(this);
        this.onChangeRoomCode = this.onChangeRoomCode.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:3001/question/explicitanswersofuser/' + this.props.username).then(res => {
            this.setState({
                questionList: res.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    addQuestionToTest(id){
        let tempAddedQuestionList = this.state.addedQuestionList;
        tempAddedQuestionList.push(this.state.questionList.filter(question => question._id === id)[0]);
        this.setState({
            addedQuestionList: tempAddedQuestionList,
            questionList: this.state.questionList.filter(question => question._id !== id)
        })
    }

    removeQuestionFromTest(id){
        let tempQuestionList = this.state.questionList;
        tempQuestionList.push(this.state.addedQuestionList.filter(question => question._id === id)[0]);
        this.setState({
            questionList: tempQuestionList,
            addedQuestionList: this.state.addedQuestionList.filter(question => question._id !== id)
        })
        console.log(this.state.addedQuestionList)
    }

    getQuestionList(array,isAdded,buttonFunction) {
        return array.map(questionElem => {
            return <TestTableRow question={questionElem} key={questionElem._id} added={isAdded} buttonFunction={buttonFunction} />
        })
    }

    onChangeRoomCode(event){
        this.setState({
            roomCode: event.target.value
        })
    }

    async sumbitTestCreation(){
        const newTest = {
            roomCode: this.state.roomCode,
            questionArray: this.state.addedQuestionList.map(question => question._id),
            teacher: this.props.username,
        }
        console.log(newTest);

        await axios.post('http://localhost:3001/test/add/',newTest).then(res => {
            console.log(res.data);
        })

        window.location = '/teacher/'
    }

    render() {
        return (
            <div className='container'>
                <h1>Test Creation Page</h1>
                <h5>Input Room Code:</h5>
                <input className='form-control' placeholder='Room Code' type='text' minLength="4" value={this.state.roomCode} onChange={this.onChangeRoomCode} />
                <br />
                <h3>Your questions:</h3>
                <div className='container' style={{ display: 'inline-block' }}>
                    <table className='table' style={{ width: "420px", float:'left'}}>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Question Body</th>
                                <th>Difficulty</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getQuestionList(this.state.questionList,false,this.addQuestionToTest)}
                        </tbody>
                    </table>
                    <table className='table' style={{ width: "65px", float:'left' }}>
                        <thead className='thead-dark'>
                            <tr>
                                <th>    &#8680;   </th>
                            </tr>
                        </thead>
                    </table>
                    <table className='table' style={{ width: "420px", float:'left' }}>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Question Body</th>
                                <th>Difficulty</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.getQuestionList(this.state.addedQuestionList,true,this.removeQuestionFromTest)}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-dark btn-lg btn-block" onClick={this.sumbitTestCreation}>Create Test</button>
            </div>
        )
    }
}