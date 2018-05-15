import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavLink.css';

const NavLink = props => <Link to={props.to} className={classes.Link}>{props.children}</Link>;

export default NavLink;