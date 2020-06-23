import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WordBox from '../index';

configure({ adapter: new Adapter() });

describe('<WordBox />', () => {
  const component = shallow(<WordBox value={{}} />);
  it('Expect to have unit tests specified', () => {
    expect(component.exists()).toEqual(true);
  });
});
