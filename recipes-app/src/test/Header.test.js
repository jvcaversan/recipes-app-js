// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { getElementsHeader } from './constants';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================

let globalHistory = '';
const elements = getElementsHeader();
const profilebuttonx = 'profile-top-btn';

// ============-------------DESCRIBE SCOPE----------------==============
// =====================================================================
describe('verifica os testes do componente Header.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, '/foods');
    globalHistory = history;
  });

  it('verifica os elementos do componente', () => {
    elements.forEach((el) => {
      const elementTestId = screen.getByTestId(el);
      expect(elementTestId).toBeInTheDocument(el);
    });
  });

  it('verifica a rota do componente', () => {
    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/foods');
  });

  it('verifica se tem um botao de profile no header', () => {
    const profileButton = screen.getByTestId(profilebuttonx);
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    // expect(pathname).toBe('/profile');
  });
});
