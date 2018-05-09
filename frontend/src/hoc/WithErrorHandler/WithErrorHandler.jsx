import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../Aux';
import classes from './WithErrorHandler.css';

const WithErrorHandler = WrappedComponent => class extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    return (nextProps.error && nextProps.error.code !== 422) ? { error: nextProps.error } : null;
  }

  render() {
    return (
      <Aux>
        {
          this.state.error ? (
            <div className={classes.Error}>
              <h1 className={classes.Code}>{this.state.error.code}</h1>
              <h4 className={classes.Message}>{this.state.error.message}</h4>
              <Link to="/car-number-plates" className={classes.Link}>Back to Home</Link>
            </div>
          ) : <WrappedComponent {...this.props} />}
      </Aux>
    );
  }
};

export default WithErrorHandler;