import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormGroup from './FormGroup';
import Label from './Label/Label';
import Feedback from './Feedback/Feedback';

configure({
  adapter: new Adapter()
});

describe('<FormGroup />', () => {

  const label = 'label';
  const error = '';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormGroup label={label} error={error}/>);
  });

  it('should render label', () => {
    expect(wrapper.find(Label)).toHaveLength(1);
  });

  it('should place text into label', () => {
    expect(wrapper.contains(<Label>{label}</Label>)).toEqual(true);
  });

  it('should render feedback if error is present', () => {
    wrapper.setProps({error: 'error'});
    expect(wrapper.find(Feedback)).toHaveLength(1);
  });

  it('should place text into feedback', () => {
    const error = 'error';
    wrapper.setProps({error});
    expect(wrapper.contains(<Feedback>{error}</Feedback>)).toEqual(true);
  });

  it('should not render feedback if error is not present', () => {
    expect(wrapper.find(Feedback)).toHaveLength(0);
  });

});