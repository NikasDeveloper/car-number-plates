import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import classes from './App.css';
import Aux from '../hoc/Aux';
import Nav from '../components/UI/Nav/Nav';
import Container from '../components/UI/Container/Container';
import CarPlates from './CarPlates/CarPlates';

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
              <Route exact path="/car-plates/create" render={() => <h1>Create page</h1>} />
              <Route exact path="/car-plates/:id" render={() => <h1>Preview page</h1>} />
              <Route exact path="/car-plates/:id/edit" render={() => <h1>Edit page</h1>} />
              <Redirect to="/car-plates" />
            </Switch>
          </Container>
        </main>
      </Aux>
    );
  }
};

export default App;