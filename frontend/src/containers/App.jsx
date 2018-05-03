import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Aux from '../hoc/Aux';
import Container from '../components/UI/Container/Container';
import Nav from '../components/UI/Nav/Nav';
import CarPlates from './CarPlates/CarPlates';
import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Aux>
        <Nav />
        <main className={classes.Main}>
          <Container>
            <Switch>
              <Route exact path="/car-plates" component={CarPlates} />
              <Redirect to="/car-plates" />
            </Switch>
          </Container>
        </main>
      </Aux>
    );
  }
};

export default App;