import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CarNumberPlate from './CarNumberPlate';

configure({
  adapter: new Adapter()
});

describe('<CarNumberPlate/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CarNumberPlate/>);
  });

  it('should render car number', () => {
    const number = 'ABC123';
    wrapper.setProps({ number });
    expect(wrapper.contains(<h4>{number}</h4>)).toEqual(true);
  });

  it('should render car number plate owner', () => {
    const owner = 'OWNER';
    wrapper.setProps({ owner });
    expect(wrapper.contains(<p>{owner}</p>)).toEqual(true);
  });

  it('should have click handler with id in props', () => {
    let id = null;
    const propId = 1;
    const clickHandler = incomeId => {
      id = incomeId;
    };
    wrapper.setProps({ id: propId, clicked: clickHandler });
    wrapper.simulate('click');
    expect(id).toEqual(propId)
  });

});
