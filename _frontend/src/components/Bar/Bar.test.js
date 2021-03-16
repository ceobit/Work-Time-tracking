import React from 'react';
import { mount, configure } from 'enzyme';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Bar } from './Bar';
import { findByTestAtr } from '../../aux';

const setUp = (props = {}) => {
  const mockStore = configureStore();
  const store = mockStore({});

  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ user: 'test' });

  return mount(
    <Provider store={store}>
      <Bar {...props} />
    </Provider>
  );
};

describe('Bar Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtr(component, 'app-bar');
    expect(wrapper.length).toBe(1);
  });
});
