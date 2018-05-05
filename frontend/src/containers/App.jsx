import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import classes from './App.css';
import Aux from '../hoc/Aux';
import Nav from '../components/UI/Nav/Nav';
import Container from '../components/UI/Container/Container';
import CarPlates from './CarPlates/CarPlates';
import CarPlate from './CarPlates/CarPlate/CarPlate';
import CarPlateCreate from './CarPlates/CarPlate/Create/CarPlateCreate';
import CarPlateUpdate from './CarPlates/CarPlate/Update/CarPlateUpdate';

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
              <Route exact path="/car-plates/create" component={CarPlateCreate} />
              <Route exact path="/car-plates/:id" component={CarPlate} />
              <Route exact path="/car-plates/:id/edit" component={CarPlateUpdate}/>
              <Redirect to="/car-plates" />
            </Switch>
          </Container>
        </main>
      </Aux>
    );
  }
}

export default App;