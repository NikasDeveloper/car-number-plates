import React from 'react';
import classes from './Container.css';

const container = props => {
  const classNames = [ classes.Container ];
  if ( props.classes ) classNames.push(props.classes);
  return (
    <div className={classNames.join(' ')} style={props.style}>
      {props.children}
    </div>
  );
};

export default container;