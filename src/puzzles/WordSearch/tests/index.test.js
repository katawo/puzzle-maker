import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WordSearch from '../index';

configure({ adapter: new Adapter() });

describe('<WordSearch />', () => {
  const component = shallow(<WordSearch />);
  it('Expect to have unit tests specified', () => {
    expect(component.exists()).toBe(true);
  });
});
