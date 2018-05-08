import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container/Container';
import classes from './Nav.css';

const nav = () => {
  return (
    <nav className={classes.Navigation}>
      <Container>
        <Link to="/car-number-plates">Car number plates assignment</Link>
      </Container>
    </nav>
  )
};

export default nav;