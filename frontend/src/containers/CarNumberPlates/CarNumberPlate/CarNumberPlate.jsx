import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchCarNumberPlate,
  deleteCarNumberPlate,
  modifyCarNumberPlateInit
} from "../../../store/actions/index";
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import Aux from '../../../hoc/Aux';
import DataPreloader from '../../../components/UI/Preloader/Data/DataPreloader';
import Form from "../../../components/UI/Form/Form";
import FormGroup from "../../../components/UI/Form/FormGroup/FormGroup";
import Input from "../../../components/UI/Form/FormGroup/Input/Input";
import Button from "../../../components/UI/Form/Button/Button";

class CarNumberPlate extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      inputs: {
        firstName: {
          value: '',
          placeholder: 'Owners first name...',
          required: true,
          error: '',
        },
        lastName: {
          value: '',
          placeholder: 'Owners last name...',
          required: true,
          error: '',
        },
        number: {
          value: '',
          placeholder: 'Car plate number...',
          required: true,
          error: '',
        },
      },
      carNumberPlateFound: false,
    };
    this.carNumberPlateLoaded = () => {
      const updatedState = { ...this.state };
      const updatedInputs = { ...updatedState.inputs };
      updatedInputs.firstName = {
        ...updatedInputs.firstName,
        value: this.props.carNumberPlate.owner.firstName
      };
      updatedInputs.lastName = {
        ...updatedInputs.lastName,
        value: this.props.carNumberPlate.owner.lastName
      };
      updatedInputs.number = {
        ...updatedInputs.number,
        value: this.props.carNumberPlate.number
      };
      this.setState({ carNumberPlateFound: true, inputs: updatedInputs });
    };
    this.inputChangedHandler = event => {
      const value = event.target.value.toUpperCase();
      const name = event.target.name;
      const updatedState = { ...this.state };
      const updatedInputs = { ...updatedState.inputs };
      const updatedInput = { ...updatedInputs[ name ] };
      updatedInput.value = value;
      updatedInput.error = "";
      updatedInputs[ name ] = updatedInput;
      this.setState({ inputs: updatedInputs });
    };
    this.formSubmitHandler = event => {
      event.preventDefault();
      console.log('submited');
    };
    this.deleteClickedHandler = () => {
      if ( window.confirm('Are you sure you want to delete this item?') ) {
        this.props.onDelete(this.props.match.params.id);
      }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onFetchStart(id);
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    if ( this.props.carNumberPlate && !this.state.carNumberPlateFound ) {
      this.carNumberPlateLoaded();
    }
  }

  componentWillUnmount() {
    this.props.onModifyInit();
  }

  render() {
    let content = <DataPreloader/>;
    if ( !this.props.loading && !this.props.modified ) {
      content = (
        <Form submitted={this.formSubmitHandler}>
          <FormGroup label="first name" error={this.state.inputs.firstName.error}>
            <Input name="firstName"
                   placeholder={this.state.inputs.firstName.placeholder}
                   value={this.state.inputs.firstName.value}
                   required={this.state.inputs.firstName.required}
                   error={this.state.inputs.firstName.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <FormGroup label="last name" error={this.state.inputs.lastName.error}>
            <Input name="lastName"
                   placeholder={this.state.inputs.lastName.placeholder}
                   value={this.state.inputs.lastName.value}
                   required={this.state.inputs.lastName.required}
                   error={this.state.inputs.lastName.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <FormGroup label="car plate number" error={this.state.inputs.number.error}>
            <Input name="number"
                   placeholder={this.state.inputs.number.placeholder}
                   value={this.state.inputs.number.value}
                   required={this.state.inputs.number.required}
                   error={this.state.inputs.number.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <div style={{ textAlign: 'right' }}>
            <Button buttonType="button"
                    style={{ marginRight: '10px' }}
                    clicked={this.deleteClickedHandler}
            >
              Delete
            </Button>
            <Button buttonType="submit" buttonClass="primary">Edit</Button>
          </div>
        </Form>
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
  onModifyInit: () => dispatch(modifyCarNumberPlateInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(CarNumberPlate));