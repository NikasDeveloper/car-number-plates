import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {
  const inputClasses = [ classes.Input ];
  if ( props.error ) inputClasses.push(classes.Invalid);
  return <input type="text"
                name={props.name}
                className={inputClasses.join(' ')}
                placeholder={props.placeholder}
                value={props.value}
                required={props.required}
                onChange={props.changed}/>;
};

export default Input;