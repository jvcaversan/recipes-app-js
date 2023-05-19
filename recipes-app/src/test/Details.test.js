// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { getElementsDetails } from './constants';
import renderWithRouter from './helpers/renderWithRouter';
// import { act } from 'react-dom/test-utils';
// import fetch from '../../cypress/mocks/fetch';
// import { meals } from '../../cypress/mocks/meals';
// import { drinks } from '../../cypress/mocks/drinks';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import Foods from '../pages/Foods';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================
let globalHistory = '';
const elements = getElementsDetails();
// const BTN_START = 'start-recipe-btn';
// const LENGTH_CARDS = 12;

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente Details em Foods.js', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/foods/53013');
    globalHistory = history;
  });

  it('verifica os elementos do componente', () => {
    elements.forEach((el) => {
      const elementTestId = screen.getByTestId(el);
      expect(elementTestId).toBeInTheDocument();
    });
  });

  it('verifica se os botões share e favorite aparecem', async () => {
    const { location: { pathname } } = globalHistory;
    console.log('pathname 1st', pathname);
    const btnShare = screen.getByTestId('share-btn');
    const btnFav = screen.getByTestId('favorite-btn');
    const btnStartRecipe = screen.getByTestId(BTN_START);
    userEvent.click(btnFav);
    userEvent.click(btnShare);
    userEvent.click(btnStartRecipe);
    await waitFor(() => {
      const newPath = globalHistory.location.pathname;
      console.log('pathname 2nd', newPath);
      expect(newPath).toBe('/foods/53013/in-progress');
    });
  });

  it('verifica redirecionamento', async () => {
    const favoriteBttn = await screen.findByAltText('icone favorite btn');
    expect(favoriteBttn.src.includes('blackHeartIcon')).toBe(true);
    // 'console.log(favoriteBttn);
  });
});

describe('verifica os testes do componente Details em Drinks.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, '/drinks/17225');
    globalHistory = history;
  });

  it('verifica os elementos do componente', () => {
    elements.forEach((elDrink) => {
      const elementTestId = screen.getByTestId(elDrink);
      expect(elementTestId).toBeInTheDocument();
    });
  });
});
