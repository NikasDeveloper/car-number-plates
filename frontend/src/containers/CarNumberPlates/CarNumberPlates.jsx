import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCarNumberPlates, fetchCarNumberPlatesInit } from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import DataPreloader from '../../components/UI/Preloader/Data/DataPreloader';
import CarPlateNumbersComponent from '../../components/CarPlateNumbers/CarPlateNumbers';

class CarNumberPlates extends Component {
  constructor( props ) {
    super(props);
    this.carPlateNumbersClickHandler = id => {
      this.props.history.push(`/car-number-plates/${id}/edit`);
    };
  }

  componentDidMount() {
    if ( !this.props.carNumberPlates.length ) {
      this.props.onFetchStart();
    }
  }

  componentWillUnmount() {
    this.props.onFetchCarNumberPlatesInit();
  }

  render() {
    return (
      <Aux>
        {
          this.props.loading
            ? <DataPreloader/>
            : <CarPlateNumbersComponent carNumberPlates={this.props.carNumberPlates}
                                        clicked={this.carPlateNumbersClickHandler}/>
        }
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.carNumberPlates.loading,
  error: state.carNumberPlates.error,
  carNumberPlates: state.carNumberPlates.carNumberPlates,
});

const mapDispatchToProps = dispatch => ({
  onFetchStart: () => dispatch(fetchCarNumberPlates()),
  onFetchCarNumberPlatesInit: () => dispatch(fetchCarNumberPlatesInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(CarNumberPlates);