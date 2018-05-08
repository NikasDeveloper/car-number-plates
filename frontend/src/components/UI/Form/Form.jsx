import React from 'react';
import classes from './Form.css';

const Form = (props) => {
  return (
    <form className={classes.Form} onSubmit={props.submitted} style={props.style}>
      {props.children}
    </form>
  );
};

export default Form;