import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import { Provider } from 'react-redux';
// import {  legacy_createStore as createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducer from '../../redux/reducers';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

/* export const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={ store }>
      <Router history={ history }>
      {component}
      </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux; */

export default renderWithRouter;
