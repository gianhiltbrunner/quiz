import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component'
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { Jumbotron, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

import Question from './components/question'

T9n.setLanguage('de');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Accounts.onLogin(function(user){
  ReactDOM.render(<App />, document.querySelector('.container'));
});
Accounts.onLogout(function(user){
  ReactDOM.render(<AppLogout />, document.querySelector('.container'));
});

const App = (props) => {
  if (Meteor.userId()){
    return (
      <div>
        <Blaze template="loginButtons" />
        <Question />
      </div>
    );
  }
  else {
    return (
      <div>
        <br></br>
        <Panel header="Warnung" bsStyle="danger">
          Bitte Einloggen!
          <br></br>
          <Blaze template="loginButtons" />
        </Panel>
      </div>
    );
  }
};

const AppLogout = (props) => {
    return (
      <div>
        <br></br>
        <Panel header="Warnung" bsStyle="danger">
          Bitte Einloggen!
          <br></br>
          <Blaze template="loginButtons" />
        </Panel>
      </div>
    );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
