import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Nav from './Nav';
import NavLink from './NavLink/NavLink';
import Container from '../Container/Container';

configure({
  adapter: new Adapter()
});

describe('<Nav />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav/>);
  });

  it('should render container', () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  it('should render 2 navigation links', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });

  it('should render home link', () => {
    expect(wrapper.contains(<NavLink to="/car-number-plates">home</NavLink>)).toEqual(true);
  });

  it('should render add new link', () => {
    expect(wrapper.contains(<NavLink to="/car-number-plates/create">add new</NavLink>)).toEqual(true);
  });

});