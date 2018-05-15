import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CarNumberPlateForm from './CarNumberPlateForm';
import Form from '../../../UI/Form/Form';
import FormGroup from '../../../UI/Form/FormGroup/FormGroup';
import Input from '../../../UI/Form/FormGroup/Input/Input';

configure({
  adapter: new Adapter()
});

describe('<CarNumberPlateForm/>', () => {
  const inputs = {
    firstName: {
      value: 'First name',
      label: 'First name',
      placeholder: 'Owners first name...',
      required: true,
      error: 'Invalid first name',
    },
    lastName: {
      value: 'Last name',
      label: 'Last name',
      placeholder: 'Owners last name...',
      required: true,
      error: '',
    }
  };
  const onSubmit = () => 'submit';
  const onChange = () => 'change';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CarNumberPlateForm inputs={inputs} submitted={onSubmit} inputChanged={onChange}/>);
  });

  it('should render <Form/>', () => {
    expect(wrapper.find(Form)).toHaveLength(1);
  });

  it('should place <Form/> props', () => {
    const form = wrapper.find(Form);
    expect(form.prop('submitted')).toEqual(onSubmit);
  });

  it('should render <FormGroup/>', () => {
    expect(wrapper.find(FormGroup)).toHaveLength(Object.keys(inputs).length);
  });

  it('should place <FormGroup/> props', () => {
    const inputKeys = Object.keys(inputs);
    wrapper.find(FormGroup).forEach(( formGroup, index ) => {
      expect(formGroup.prop('label')).toEqual(inputs[ inputKeys[ index ] ].label);
      expect(formGroup.prop('error')).toEqual(inputs[ inputKeys[ index ] ].error);
    });
  });

  it('should render <Input/>', () => {
    expect(wrapper.find(Input)).toHaveLength(Object.keys(inputs).length);
  });

  it('should place <Input/> props', () => {
    const inputKeys = Object.keys(inputs);
    wrapper.find(Input).forEach(( input, index ) => {
      expect(input.prop('name')).toEqual(inputKeys[ index ]);
      expect(input.prop('placeholder')).toEqual(inputs[ inputKeys[ index ] ].placeholder);
      expect(input.prop('value')).toEqual(inputs[ inputKeys[ index ] ].value);
      expect(input.prop('required')).toEqual(inputs[ inputKeys[ index ] ].required);
      expect(input.prop('error')).toEqual(inputs[ inputKeys[ index ] ].error);
      expect(input.prop('changed')).toEqual(onChange);
    });
  });

});