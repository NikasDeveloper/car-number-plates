import React from 'react';

import Container from '../Container/Container';
import NavLink from './NavLink/NavLink';
import classes from './Nav.css';

const nav = () => {
  return (
    <nav className={classes.Navigation}>
      <Container classes={classes.Container}>
        <NavLink to="/car-number-plates">home</NavLink>
        <NavLink to="/car-number-plates/create">add new</NavLink>
      </Container>
    </nav>
  )
};

export default nav;