import React from 'react';
import classes from './Button.css';

const Button = props => {
  const type = props.buttonType ? props.buttonType : "button";
  const buttonClasses = [ classes.Button];
  buttonClasses.push(props.buttonClass !== "primary" ? classes.ButtonDanger : classes.ButtonPrimary);
  return (
    <button type={type}
            className={buttonClasses.join(' ')}
            style={props.style}
            disabled={props.disabled}
            onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;