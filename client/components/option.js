import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

function Option(props) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled} name={props.name} bsSize="large">
      {props.option}
    </Button>
  );
}

export default Option;
