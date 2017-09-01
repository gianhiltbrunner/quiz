import React from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component'
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

import Question from './components/question'

T9n.setLanguage('de');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

const App = (probs) => {
  return (
    <div>
      <Blaze template="loginButtons" />
      <Question />
    </div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
