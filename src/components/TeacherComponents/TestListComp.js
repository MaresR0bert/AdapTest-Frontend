import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import {FaTrashAlt} from 'react-icons/fa';

export default class TestList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            testArray: []
        }

        this.populateAccordionCollapseWithValues = this.populateAccordionCollapseWithValues.bind(this);
        this.populateAccordionWithTests = this.populateAccordionWithTests.bind(this);
    }

    async componentDidMount() {
        await axios.get("http://localhost:3001/test/getbyname/" + this.props.username).then(res => {
            this.setState({
                testArray: res.data
            })
        })
    }

    populateAccordionCollapseWithValues(array) {
        return array.map(testElem => {
            return <div>{testElem}</div>
        })
    }

    populateAccordionWithTests() {
        if (!this.state.testArray) {
            return <h3>No active tests</h3>
        } else {
            return this.state.testArray.map(test => {
                let randomVal = Math.round(Math.random() * 1000);
                return <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={randomVal}>
                        RoomCode: {test.roomCode} | TimeStamp: {test.createdAt.replace("T", " ").replace("Z", " ")}
                        <button className='btn btn-light' onClick={async () =>{
                            await axios.delete("http://localhost:3001/test/"+test._id).then(res => {
                                console.log(res.data);
                                this.setState({
                                    testArray: this.state.testArray.filter(testParam => testParam._id !== test._id)
                                })
                            })
                        }}><FaTrashAlt /></button>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={randomVal}>
                        <Card.Body>
                            <h5>Questions</h5>
                            {this.populateAccordionCollapseWithValues(test.questionArray)}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <h2>Your tests</h2>
                <Accordion>
                    {this.populateAccordionWithTests()}
                </Accordion>
            </div>
        )
    }
}