import React, { Component } from 'react';
import DataPreloader from '../../components/UI/Preloader/Data/DataPreloader';

class CarPlates extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <DataPreloader/>
    );
  }
}

export default CarPlates;