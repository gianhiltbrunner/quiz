import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Jumbotron, Button, ButtonGroup, ButtonToolbar, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Statistics } from '../../imports/collections/stats';

class StatContainer extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    var record = this.props.users.map(function(element) {
       return (
         {
           name: element.name,
           points: element.points
         }
       )
    });
    record.sort(function (a, b) {
      return b.points-a.points;
    });
    console.log(record);
    return (
      <Jumbotron>
      <h3>Statistik</h3>
        <ListGroup>
          {record.map((option, i) =>
            <ListGroupItem key={option.toString()+i}>{i+1}. {option.name} ({option.points})</ListGroupItem>
          )}
        </ListGroup>
      </Jumbotron>
    );
  }
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('statistics');
  const users = Statistics.find({}).fetch();
  return { users };
}, StatContainer);
