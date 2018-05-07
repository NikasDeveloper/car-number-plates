import React from 'react';
import Aux from '../../hoc/Aux';
import CarPlateNumber from './CarPlateNumber/CarPlateNumber';
import classes from './CarPlateNumbers.css';

const CarPlateNumbers = props => {
  return (
    <Aux>
      <h1 className={classes.Title}>Registered car number plates</h1>
      <div className={classes.CarPlateNumbers}>
        {props.carNumberPlates.map(cnp => (
          <CarPlateNumber key={cnp._id}
                          id={cnp._id}
                          number={cnp.number}
                          owner={[ cnp.owner.firstName, cnp.owner.lastName ].join(' ')}
                          clicked={props.clicked}/>
        ))}
      </div>
    </Aux>
  );
};

export default CarPlateNumbers;