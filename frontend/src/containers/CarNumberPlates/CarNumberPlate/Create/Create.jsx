import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createInit, create } from "../../../../store/actions/index";
import WithErrorHandler from '../../../../hoc/WithErrorHandler/WithErrorHandler';
import Aux from '../../../../hoc/Aux';
import Form from "../../../../components/UI/Form/Form";
import FormGroup from "../../../../components/UI/Form/FormGroup/FormGroup";
import Input from "../../../../components/UI/Form/FormGroup/Input/Input";
import Button from "../../../../components/UI/Form/Button/Button";

class Create extends Component {
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
      }
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
    if ( nextProps.error && nextProps.error.code === 422 ) {
      const errors = nextProps.error.errors;
      const updatedState = { ...prevState };
      const updatedInputs = { ...updatedState.inputs };
      errors.forEach(e => {
        const updatedInput = { ...updatedInputs[ e.key ] };
        updatedInput.error = e.message;
        updatedInputs[ e.key ] = updatedInput;
      });
      newState = { inputs: updatedInputs };
    }
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
            <FormGroup label="number on car plate" error={this.state.inputs.number.error}>
              <Input name="number"
                     placeholder={this.state.inputs.number.placeholder}
                     value={this.state.inputs.number.value}
                     required={this.state.inputs.number.required}
                     error={this.state.inputs.number.error}
                     changed={this.inputChangedHandler}/>
            </FormGroup>
            <div style={{ textAlign: 'center' }}>
              <Button buttonType="submit"
                      buttonClass="primary"
                      disabled={this.props.creating}
              >
                Create
              </Button>
            </div>
          </Form>
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