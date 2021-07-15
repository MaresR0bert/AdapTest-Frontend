import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa'


export default class TestHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            testLogArray: [],
            notAllowedTests: []
        }

        this.populateAccordionCollapseWithValues = this.populateAccordionCollapseWithValues.bind(this);
        this.populateAccordionWithTestLogs = this.populateAccordionWithTestLogs.bind(this);
        this.getMean = this.getMean.bind(this);
    }

    async componentDidMount() {
        let testLogArrayDummy = [];
        await axios.get("http://localhost:3001/testlog/getbyname/" + this.props.username).then(res => {
            testLogArrayDummy = res.data
        })

        await axios.get("http://localhost:3001/test/getallroomcodes/").then(res => {
            this.setState({
                testLogArray: testLogArrayDummy,
                notAllowedTests: res.data
            })
        })
    }

    populateAccordionCollapseWithValues(array, array2) {
        let tempArray = [];
        for(let i = 0; i < array.length; i++){
            tempArray.push([array[i], array2[i]]);
        }
        return tempArray.map(questionElem => {
            return <div>{questionElem[0]} : {questionElem[1]}</div>
        })
    }

    getMean(array) {
        return (array[array.length - 1] + array[array.length - 2] + array[array.length - 3]) / 3
    }

    populateAccordionWithTestLogs(testLogArrayParam) {
        if (!testLogArrayParam.length) {
            return <h3>You took no tests yet</h3>
        } else {
            return testLogArrayParam.map(testLog => {
                let randomVal = Math.round(Math.random() * 10000);
                if (this.state.notAllowedTests.includes(testLog.roomCode)) {
                    return <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={randomVal}>
                            <h6>
                                RoomCode: {testLog.roomCode}
                                <br />
                                Score: {this.getMean(testLog.score) * 10}%
                                <br />
                                TimeStamp: {testLog.createdAt.replace("T", " ").replace("Z", " ")}
                                <br />
                                Teacher: {testLog.teacher}
                            </h6>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={randomVal}>
                            <Card.Body>
                                <h5>
                                    Inspection Not Allowed
                                </h5>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                } else {
                    return <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={randomVal}>
                            <h6>
                                RoomCode: {testLog.roomCode}
                                <br />
                                Score: {this.getMean(testLog.score) * 10}%
                                <br />
                                TimeStamp: {testLog.createdAt.replace("T", " ").replace("Z", " ")}
                                <br />
                                Teacher: {testLog.teacher}
                            </h6>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={randomVal}>
                            <Card.Body>
                                <h5>Questions : Your answers</h5>
                                {this.populateAccordionCollapseWithValues(testLog.questionArray, testLog.givenAnswers)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                }
            })
        }
    }

    render() {
        if (this.state.testLogArray) {
            return (
                <div className='container'>
                    <h2>Test History</h2>
                    <Accordion>
                        {this.populateAccordionWithTestLogs(this.state.testLogArray.reverse())}
                    </Accordion>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h2>Test History</h2>
                    <h4>You took no tests yet</h4>
                </div>
            )
        }
    }
}