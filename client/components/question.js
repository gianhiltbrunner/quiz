import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Jumbotron, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

import Option from './option.js';
import { Questions } from '../../imports/collections/questions';

Questions.insert({
  room: "kl4t6",
  question: 'Was ist das?',
  options: [
      "Haus",
      "Baum",
      "See",
      "Berg"
  ]
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {disabled: false};
  };

  componentWillReceiveProps(nextProps){
    this.state = {disabled: false};
  }


  click = (option) => {
    option.preventDefault();
    console.log(option.target.name);
    this.setState({disabled: true});
  }

  render(){
    const data = this.props.questions.slice(-1)[0];//Get last question
    return (
        <Jumbotron>
            <p className="lead">{data.question}</p>
            <hr className="my-4"></hr>
            <ButtonGroup vertical block>
                <Option  name={1} disabled={this.state.disabled} onClick={this.click} key={data._id + "0"} option={data.options[0]}/>
                <Option  name={2} disabled={this.state.disabled} onClick={this.click} key={data._id + "1"} option={data.options[1]}/>
                <Option  name={3} disabled={this.state.disabled} onClick={this.click} key={data._id + "2"} option={data.options[2]}/>
                <Option  name={4} disabled={this.state.disabled} onClick={this.click} key={data._id + "3"} option={data.options[3]}/>
            </ButtonGroup>
        </Jumbotron>
    );
  }
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('questions');
  const questions = Questions.find({}).fetch();
  return { questions };
}, Question);
