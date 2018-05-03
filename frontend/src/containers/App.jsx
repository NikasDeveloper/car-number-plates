import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CarPlates from './CarPlates/CarPlates';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/car-plates" component={CarPlates} />
        <Redirect to="/car-plates" />
      </Switch>
    );
  }
};

export default App;