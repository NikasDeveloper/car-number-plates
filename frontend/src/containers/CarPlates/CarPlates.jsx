import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCarNumberPlatesInit, fetchCarNumberPlates } from '../../store/actions/index';
import DataPreloader from '../../components/UI/Preloader/Data/DataPreloader';

class CarPlates extends Component {
  constructor( props ) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchStart();
  }

  render() {
    const content = this.props.loading
      ? <DataPreloader/>
      : (
        <ul>
          {this.props.carNumberPlates.map(cnp => <li key={cnp._id}>{cnp.number}</li>)}
        </ul>
      );
    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.carNumberPlates.loading,
  error: state.carNumberPlates.error,
  carNumberPlates: state.carNumberPlates.carNumberPlates,
});

const mapDispatchToProps = dispatch => ({
  onFetchStart: () => dispatch(fetchCarNumberPlates())
});

export default connect(mapStateToProps, mapDispatchToProps)(CarPlates);