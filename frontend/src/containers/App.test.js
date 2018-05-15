import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Nav from '../components/UI/Nav/Nav';
import CarNumberPlates from './CarNumberPlates/CarNumberPlates';
import Create from './CarNumberPlates/CarNumberPlate/Create/Create';
import CarNumberPlate from './CarNumberPlates/CarNumberPlate/CarNumberPlate';

configure({
  adapter: new Adapter()
});

describe('<App />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should render nav', () => {
    expect(wrapper.contains(<Nav/>)).toEqual(true);
  });

  it('should render car number plates route', () => {
    expect(wrapper.exists(<Route exact path="/car-number-plates" component={CarNumberPlates}/>)).toEqual(true);
  });

  it('should render car number plate preview route', () => {
    expect(wrapper.exists(<Route exact path="/car-number-plates/create" component={Create}/>)).toEqual(true);
  });

  it('should render car number plate preview/edit/delete route', () => {
    expect(wrapper.exists(<Route exact path="/car-number-plates/:id/edit" component={CarNumberPlate}/>)).toEqual(true);
  });

  it('should render redirect to car number plates route', () => {
    expect(wrapper.exists(<Redirect to="/car-number-plates"/>)).toEqual(true);
  });

});