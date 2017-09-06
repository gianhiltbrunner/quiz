import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component'
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { Jumbotron, Panel } from 'react-bootstrap';
import Question from './components/question';
import StatContainer from './components/stats';
import { createContainer } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  browserHistory
} from 'react-router-dom'

T9n.setLanguage('de');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

const App = (props) => {
    return (
      <Jumbotron>
        <Blaze template="loginButtons" />
        <Question />
      </Jumbotron>
    );
};

const Login = (props) => {
  return (
    <Jumbotron>
       <br></br>
       <Panel header="Warnung" bsStyle="danger">
           Bitte Einloggen!
           <hr></hr>
           <Blaze template="loginButtons" />
       </Panel>
    </Jumbotron>
  );
};

const Admin = (props) => {
  return (
    <div>
      <StatContainer />
    </div>
  );
};

class Routes extends Component {
  constructor(props) {
    super(props);
  };
  render(){
    return(
      <Router history={browserHistory}>
        <ul>
            <Route path="/admin" component={Admin} />
            <Route exact path="/login" render={() => (
              !!this.props.user ? (
                <Redirect to="/"/>
              ) : (
                <Login />
              )
            )}/>
            <Route exact path="/" render={() => (
              !!this.props.user ? (
                <App />
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
        </ul>
      </Router>
    );
  }
}

const RoutesContainer = createContainer(() => {
  return {
    user: Meteor.userId(),
  };
},Routes);

Meteor.startup(() => {
  ReactDOM.render(<RoutesContainer />, document.querySelector('.container'));
});
