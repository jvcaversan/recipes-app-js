// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getElementsProfilePage } from './constants';
import renderWithRouter from './helpers/renderWithRouter';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================
let globalHistory = '';
const elements = getElementsProfilePage();

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes da pagina Profile.js', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', '{ "email": "email@mail.com" }');
    const { history } = renderWithRouter(<App />, '/profile');
    globalHistory = history;
  });

  it('verifica a rota da pagina correta', () => {
    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/profile');
  });

  it('verifica os elementos da página profile', () => {
    elements.forEach((el) => {
      const elementTestId = screen.getByTestId(el);
      expect(elementTestId).toBeInTheDocument(el);
    });
  });

  it('verifica se direciona para rota done-recipies', () => {
    const BTN_DONE_RECIPES = screen.getByTestId('profile-done-btn');
    userEvent.click(BTN_DONE_RECIPES);

    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/done-recipes');
  });

  it('verifica se direciona para rota favorites-recipies', () => {
    const BTN_FAVORITE_RECIPES = screen.getByTestId('profile-favorite-btn');
    userEvent.click(BTN_FAVORITE_RECIPES);

    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('verifica se direciona para rota login apos logout', () => {
    const BTN_LOGOUT_RECIPES = screen.getByTestId('profile-logout-btn');
    userEvent.click(BTN_LOGOUT_RECIPES);

    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/');
  });
});

/* describe('verifica quando user for undefined', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', []);
    const { history } = renderWithRouter(<App />, '/profile');
    globalHistory = history;
  });

  it.only('verifica a rota da pagina correta', async () => {
    const { location: { pathname } } = globalHistory;
    const elUser = await screen.findByTestId('profile-email');
    expect(elUser).toBeInTheDocument();
    // expect(pathname).toBe('/profile');
  });
}); */
