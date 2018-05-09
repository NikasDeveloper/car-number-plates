import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchCarNumberPlate,
  deleteCarNumberPlate,
  updateCarNumberPlate,
  modifyCarNumberPlateInit
} from "../../../store/actions/index";
import Aux from '../../../hoc/Aux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import Preloader from '../../../components/UI/Preloader/Preloader';
import Button from "../../../components/UI/Form/Button/Button";
import CarPlateNumberForm from "../../../components/CarPlateNumbers/CarPlateNumber/Form/CarPlateNumberForm";
import { inputsFactory, bindInputErrors, bindCarNumberPlateToInputs } from '../../../store/utility';

class CarNumberPlate extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      inputs: inputsFactory(),
      carNumberPlateFound: false,
    };
    this.inputChangedHandler = event => {
      const value = event.target.value.toUpperCase();
      const name = event.target.name;
      const updatedState = { ...this.state };
      const updatedInputs = { ...updatedState.inputs };
      const updatedInput = { ...updatedInputs[ name ] };
      updatedInput.value = value;
      updatedInput.error = '';
      updatedInputs[ name ] = updatedInput;
      this.setState({ inputs: updatedInputs });
    };
    this.formSubmitHandler = event => {
      event.preventDefault();
      const id = this.props.match.params.id;
      const carNumberPlate = {
        number: this.state.inputs.number.value,
        owner: {
          firstName: this.state.inputs.firstName.value,
          lastName: this.state.inputs.lastName.value
        }
      };
      this.props.onUpdate(id, carNumberPlate);
    };
    this.deleteClickedHandler = () => {
      if ( window.confirm('Are you sure you want to delete this item?') ) {
        this.props.onDelete(this.props.match.params.id);
      }
    }
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const bindCarNumberPlate = nextProps.carNumberPlate && !prevState.carNumberPlateFound;
    const bindErrors = nextProps.error && nextProps.error.code === 422;
    let newState = null;
    if ( bindErrors ) newState = bindInputErrors(nextProps, prevState);
    if ( bindCarNumberPlate ) newState = bindCarNumberPlateToInputs(nextProps, prevState);
    return newState;
  }

  componentDidMount() {
    this.props.onFetchStart(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onModifyInit();
  }

  render() {
    let content = <Preloader/>;
    if ( !this.props.loading && !this.props.modified ) {
      content = (
        <Aux>
          <h2 style={{ textTransform: 'uppercase', textAlign: 'center' }}>edit car number plate</h2>
          <CarPlateNumberForm submitted={this.formSubmitHandler}
                              inputs={this.state.inputs}
                              inputChanged={this.inputChangedHandler}>
            <div style={{ textAlign: 'right' }}>
              <Button buttonType="button"
                      style={{ marginRight: '10px' }}
                      disabled={this.props.modifying}
                      clicked={this.deleteClickedHandler}>
                Delete
              </Button>
              <Button buttonType="submit" buttonClass="primary" disabled={this.props.modifying}>Edit</Button>
            </div>
          </CarPlateNumberForm>

        </Aux>
      );
    }
    if ( this.props.modified ) content = <Redirect to="/car-number-plates"/>;
    return (
      <Aux>
        {content}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  carNumberPlate: state.carNumberPlate.carNumberPlate,
  loading: state.carNumberPlate.loading,
  modifying: state.carNumberPlate.modifying,
  modified: state.carNumberPlate.modified,
  error: state.carNumberPlate.error,
});

const mapDispatchToProps = dispatch => ({
  onFetchStart: id => dispatch(fetchCarNumberPlate(id)),
  onDelete: id => dispatch(deleteCarNumberPlate(id)),
  onUpdate: ( id, carNumberPlate ) => dispatch(updateCarNumberPlate(id, carNumberPlate)),
  onModifyInit: () => dispatch(modifyCarNumberPlateInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(CarNumberPlate));