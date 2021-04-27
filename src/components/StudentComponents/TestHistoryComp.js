import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import {FaTrashAlt} from 'react-icons/fa'


export default class TestHistory extends Component {
    constructor(props){
        super(props)

        this.state = {
            testLogArray: []
        }

        this.populateAccordionCollapseWithValues = this.populateAccordionCollapseWithValues.bind(this);
        this.populateAccordionWithTestLogs = this.populateAccordionWithTestLogs.bind(this);
    }

    async componentDidMount(){
        await axios.get("http://localhost:3001/testlog/getbyname/"+this.props.username).then(res => {
            this.setState({
                testLogArray: res.data
            })
        })
    }

    populateAccordionCollapseWithValues(array){
        return array.map(questionElem => {
            return <div>{questionElem}</div>
        })
    }

    populateAccordionWithTestLogs(){
        return this.state.testLogArray.map(testLog => {
            let randomVal = Math.round(Math.random()*1000);
            return <Card>
                <Accordion.Toggle as = {Card.Header} eventKey={randomVal}>
                    RoomCode: {testLog.roomCode} | Score: {testLog.score} / {testLog.questionArray.length} | TimeStamp: {testLog.createdAt.replace("T"," ").replace("Z"," ")} | Teacher: {testLog.teacher}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={randomVal}>
                    <Card.Body>
                        <h5>Questions</h5>
                        {this.populateAccordionCollapseWithValues(testLog.questionArray)}
                    </Card.Body>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey={randomVal}>
                    <Card.Body>
                        <h5>Your answers</h5>
                        {this.populateAccordionCollapseWithValues(testLog.givenAnswers)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        })
    }

    render() {
        return (
            <div className='container'>
                <h2>Test History</h2>
                <Accordion>
                    {this.populateAccordionWithTestLogs()}
                </Accordion>
            </div>
        )
    }
}