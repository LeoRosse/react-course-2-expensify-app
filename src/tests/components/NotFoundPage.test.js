import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NotFoundPage from '../../components/NotFoundPage';

test('should render Header correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});