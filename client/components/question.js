import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Jumbotron, Button, ButtonGroup, ButtonToolbar, Panel } from 'react-bootstrap';

import Option from './option.js';
import { Questions } from '../../imports/collections/questions';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {disabled: false};
  };

  componentWillReceiveProps(nextProps){
    this.state = {disabled: false};
  }

  click = (option) => {
    const data = this.props.questions.slice(-1)[0];
    option.preventDefault();
    this.setState({disabled: true});

    result = {
      questionID: data._id.toString(),
      response: option.target.name
    };
    Meteor.call('sendResult', result);
  }

  render(){
    const data = this.props.questions.slice(-1)[0];//Get last question
    if (data) {
      return (
          <Jumbotron>
              <p className="lead">{data.question}</p>
              <hr className="my-4"></hr>
              <ButtonGroup vertical block>
                  {data.options.map((option, i) =>
                    <Option  name={i+1} disabled={this.state.disabled} onClick={this.click} key={option.toString()+i} option={option}/>
                  )}
              </ButtonGroup>
          </Jumbotron>
      );
    }
    else {
      return (
        <Panel header="Information" bsStyle="info">
          Bitte warten!
        </Panel>
      );
    }
  }
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('questions');
  const questions = Questions.find({}).fetch();
  return { questions };
}, Question);
