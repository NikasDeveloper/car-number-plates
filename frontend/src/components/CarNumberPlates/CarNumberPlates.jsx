import React from 'react';
import Aux from '../../hoc/Aux';
import CarNumberPlate from './CarNumberPlate/CarNumberPlate';
import classes from './CarNumberPlates.css';

const CarNumberPlates = props => {
  return (
    <Aux>
      <h1 className={classes.Title}>Registered car number plates</h1>
      <div className={classes.CarPlateNumbers}>
        {
          props.carNumberPlates.length ?
            props.carNumberPlates.map(cnp => (
              <CarNumberPlate key={cnp._id}
                              id={cnp._id}
                              number={cnp.number}
                              owner={[ cnp.owner.firstName, cnp.owner.lastName ].join(' ')}
                              clicked={props.clicked}/>
            ))
            : <h3 style={{ textAlign: 'center' }}>No car number plates found.</h3>
        }
      </div>
    </Aux>
  );
};

export default CarNumberPlates;