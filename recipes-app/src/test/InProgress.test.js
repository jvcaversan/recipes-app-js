// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import { screen/* , waitFor */ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { getElementsDetails } from './constants';
import renderWithRouter from './helpers/renderWithRouter';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================
let globalHistory = '';
const elements = getElementsDetails();
// const BTN_FINISH = 'finish-recipe-btn';
// const LENGTH_CARDS = 12;
console.log(globalHistory);

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente InProgress em Foods', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/foods/53060/in-progress');
    globalHistory = history;
  });

  it('verifica os elementos do componente em foods', () => {
    elements.forEach((el) => {
      const elementTestId = screen.getByTestId(el);
      expect(elementTestId).toBeInTheDocument();
    });
  });
});

describe('verifica os testes do componente InProgress em Drinks', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/drinks/13332/in-progress');
    globalHistory = history;
  });

  it('verifica os elementos do componente em Drinks', () => {
    elements.forEach((el) => {
      const elTestId = screen.getByTestId(el);
      expect(elTestId).toBeInTheDocument();
    });
  });
});
