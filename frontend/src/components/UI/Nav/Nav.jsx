import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container/Container';
import classes from './Nav.css';

const nav = () => {
  return (
    <nav className={classes.Navigation}>
      <Container classes={classes.Container}>
        <Link to="/car-number-plates" className={classes.Link}>
          home
        </Link>
        <Link to="/car-number-plates/create" className={classes.Link}>
          add new
        </Link>
      </Container>
    </nav>
  )
};

export default nav;