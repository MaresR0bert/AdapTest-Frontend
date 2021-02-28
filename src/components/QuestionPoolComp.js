import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class QuestionPool extends Component {
    constructor(props){
        super(props);

        this.deleteQuestion = this.deleteQuestion.bind(this);
        
        this.state={
            questionList:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/question/').then(res=>{
            //console.log(res.data);
            this.setState({
                questionList:res.data
            })
        }).catch(error=>{
            console.log(error);
        })
    }

    deleteQuestion(id){
        axios.delete('http://localhost:3001/question/'+id).then(res=>{
            console.log(res.data);
        });

        this.setState({
            questionList : this.state.questionList.filter(question => question._id !== id)
        })
    }

    render() {
        return (
            <div className='container'>
                Your pool:
                {console.log(this.state.questionList)}
            </div>
        )
    }
}