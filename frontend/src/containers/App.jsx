import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import classes from './App.css';
import Aux from '../hoc/Aux';
import Nav from '../components/UI/Nav/Nav';
import Container from '../components/UI/Container/Container';
import CarNumberPlates from './CarNumberPlates/CarNumberPlates';
import Create from './CarNumberPlates/CarNumberPlate/Create/Create';
import CarNumberPlate from './CarNumberPlates/CarNumberPlate/CarNumberPlate';

class App extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <Aux>
        <Nav/>
        <main className={classes.Main}>
          <Container>
            <Switch>
              <Route exact path="/car-number-plates" component={CarNumberPlates}/>
              <Route exact path="/car-number-plates/create" component={Create}/>
              <Route exact path="/car-number-plates/:id/edit" component={CarNumberPlate}/>
              <Redirect to="/car-number-plates"/>
            </Switch>
          </Container>
        </main>
      </Aux>
    );
  }
}

export default App;