import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createInit, create } from "../../../../store/actions/index";
import WithErrorHandler from '../../../../hoc/WithErrorHandler/WithErrorHandler';
import Aux from '../../../../hoc/Aux';
import CarNumberPlateForm from "../../../../components/CarNumberPlates/CarNumberPlate/Form/CarNumberPlateForm";
import Button from "../../../../components/UI/Form/Button/Button";
import { inputsFactory, bindInputErrors } from '../../../../store/utility';

class Create extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      inputs: inputsFactory()
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
      const carNumberPlate = {
        number: this.state.inputs.number.value,
        owner: {
          firstName: this.state.inputs.firstName.value,
          lastName: this.state.inputs.lastName.value
        }
      };
      this.props.onCreate(carNumberPlate);
    };
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    let newState = null;
    if ( nextProps.error && nextProps.error.code === 422 ) newState = bindInputErrors(nextProps, prevState);
    return newState;
  }

  componentWillUnmount() {
    this.props.onInit();
  }

  render() {
    let content = <Redirect to="/car-number-plates"/>;
    if ( !this.props.created ) {
      content = (
        <Aux>
          <h2 style={{ textTransform: 'uppercase', textAlign: 'center' }}>create new car number plate</h2>
          <CarNumberPlateForm submitted={this.formSubmitHandler}
                              inputs={this.state.inputs}
                              inputChanged={this.inputChangedHandler}>
            <div style={{ textAlign: 'center' }}>
              <Button buttonType="submit" buttonClass="primary" disabled={this.props.creating}>
                Create
              </Button>
            </div>
          </CarNumberPlateForm>
        </Aux>
      );
    }
    return <Aux>{content}</Aux>;
  }
}

const mapStateToProps = state => ({
  creating: state.create.creating,
  created: state.create.created,
  error: state.create.error,
});

const mapDispatchToProps = dispatch => ({
  onInit: () => dispatch(createInit()),
  onCreate: cnp => dispatch(create(cnp))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Create));