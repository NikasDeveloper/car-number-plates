import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCarNumberPlate } from "../../../../store/actions";
import Aux from '../../../../hoc/Aux';
import DataPreloader from '../../../../components/UI/Preloader/Data/DataPreloader';
import Form from "../../../../components/UI/Form/Form";
import FormGroup from "../../../../components/UI/Form/FormGroup/FormGroup";
import Input from "../../../../components/UI/Form/FormGroup/Input/Input";
import Button from "../../../../components/UI/Form/Button/Button";

class CarNumberPlateUpdate extends Component {
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
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onFetchStart(id);
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    if ( this.props.carNumberPlate && !this.state.carNumberPlateFound ) this.carNumberPlateLoaded();
  }

  render() {
    let content = <DataPreloader/>;
    if ( !this.props.loading ) {
      content = (
        <Form submitted={this.formSubmitHandler}>
          <FormGroup label="first name" error={this.state.inputs.firstName.error}>
            <Input name="firstName"
                   placeholder={this.state.inputs.firstName.placeholder}
                   value={this.state.inputs.firstName.value}
                   error={this.state.inputs.firstName.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <FormGroup label="last name" error={this.state.inputs.lastName.error}>
            <Input name="lastName"
                   placeholder={this.state.inputs.lastName.placeholder}
                   value={this.state.inputs.lastName.value}
                   error={this.state.inputs.lastName.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <FormGroup label="car plate number" error={this.state.inputs.number.error}>
            <Input name="number"
                   placeholder={this.state.inputs.number.placeholder}
                   value={this.state.inputs.number.value}
                   error={this.state.inputs.number.error}
                   changed={this.inputChangedHandler}/>
          </FormGroup>
          <div style={{ textAlign: 'right' }}>
            <Button buttonType="button" style={{ marginRight: '10px' }}>Delete</Button>
            <Button buttonType="submit" buttonClass="primary">Edit</Button>
          </div>
        </Form>
      );
    }
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
  error: state.carNumberPlate.error,
});

const mapDispatchToProps = dispatch => ({
  onFetchStart: id => dispatch(fetchCarNumberPlate(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CarNumberPlateUpdate);