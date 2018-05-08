import React from 'react';
import classes from './FormGroup.css';
import Label from './Label/Label';
import Feedback from './Feedback/Feedback';

const FormGroup = ( props ) => {
  return (
    <div className={classes.FormGroup} style={props.style}>
      <Label>{props.label}</Label>
      {props.children}
      {props.error ? <Feedback>{props.error}</Feedback> : null}
    </div>
  );
};

export default FormGroup;