import React from 'react';
import classes from './CarPlateNumber.css';

const CarPlateNumber = props => {
  return (
    <div className={classes.CarPlateNumber} onClick={() => props.clicked(props.id)}>
      <h4>{props.number}</h4>
      <p>{props.owner}</p>
    </div>
  );
};

export default CarPlateNumber;