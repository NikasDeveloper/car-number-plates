import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CarNumberPlates from './CarNumberPlates';
import CarNumberPlate from './CarNumberPlate/CarNumberPlate';

configure({
  adapter: new Adapter()
});

describe('<CarNumberPlatesComponent />', () => {
  let wrapper;
  const carNumberPlates = [];

  beforeEach(() => {
    wrapper = shallow(<CarNumberPlates carNumberPlates={carNumberPlates}/>);
  });

  it('should render title', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual('Registered car number plates')
  });

  it('should render no car number plates header if car number plates is empty array', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual('No car number plates found.')
  });

  it('should render as much car number plate components as car number plate array length is', () => {
    expect(wrapper.find(CarNumberPlate)).toHaveLength(carNumberPlates.length);
    carNumberPlates.push({ _id: 1, number: "ABC123", owner: "John Doe", clicked: () => 1 });
    wrapper.setProps({ carNumberPlates });
    expect(wrapper.find(CarNumberPlate)).toHaveLength(carNumberPlates.length);
  });

});