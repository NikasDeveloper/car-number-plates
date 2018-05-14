import React from 'react';
import classes from './CarNumberPlate.css';

const CarNumberPlate = props => (
  <div className={classes.CarPlateNumber} onClick={() => props.clicked(props.id)}>
    <h4>{props.number}</h4>
    <p>{props.owner}</p>
  </div>
);

export default CarNumberPlate;