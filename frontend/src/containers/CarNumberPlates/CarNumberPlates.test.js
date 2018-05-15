import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CarNumberPlates } from './CarNumberPlates';
import Preloader from '../../components/UI/Preloader/Preloader';
import CarNumberPlatesComponent from '../../components/CarNumberPlates/CarNumberPlates';

configure({
  adapter: new Adapter()
});

describe('<CarNumberPlates />', () => {

  let wrapper;
  const loading = false;
  const carNumberPlates = [];
  const callback = () => 1;

  beforeEach(() => {
    wrapper = shallow(
      <CarNumberPlates loading={loading}
                       carNumberPlates={carNumberPlates}
                       onFetchStart={callback}
                       onFetchCarNumberPlatesInit={callback}/>
    );
  });

  it('should render <Preloader/> if loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.contains(<Preloader/>)).toEqual(true);
  });

  it('should render <CarNumberPlatesComponent/> if not loading', () => {
    expect(wrapper.find(CarNumberPlatesComponent)).toHaveLength(1);
  });

  it('should place props for <CarNumberPlatesComponent/>', () => {
    const component = wrapper.find(CarNumberPlatesComponent);
    expect(component.prop('carNumberPlates')).toEqual(carNumberPlates);
    expect(component.prop('clicked')).toEqual(wrapper.instance().carPlateNumbersClickHandler);
  });

});