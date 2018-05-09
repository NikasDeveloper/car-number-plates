import React from 'react';
import Form from "../../../UI/Form/Form";
import FormGroup from "../../../UI/Form/FormGroup/FormGroup";
import Input from "../../../UI/Form/FormGroup/Input/Input";

const mapInputs = inp => {
  const inputs = [];
  Object.entries(inp).forEach(( [ key, value ] ) => {
    inputs.push({ ...value, name: key })
  });
  return inputs;
};

const CarPlateNumberForm = props => {
  return (
    <Form submitted={props.submitted}>
      {
        mapInputs(props.inputs).map(input => (
          <FormGroup label={input.label} error={input.error} key={input.name}>
            <Input name={input.name}
                   placeholder={input.placeholder}
                   value={input.value}
                   required={input.required}
                   error={input.error}
                   changed={props.inputChanged}/>
          </FormGroup>
        ))
      }
      {props.children}
    </Form>
  );
};

export default CarPlateNumberForm;