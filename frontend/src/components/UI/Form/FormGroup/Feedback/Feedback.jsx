import React from 'react';
import classes from './Feedback.css';

const Feedback = ( props ) => {
  return (
    <div className={[ classes.Feedback, classes.Invalid ].join(' ')}>
      {props.children}
    </div>
  );
};

export default Feedback;