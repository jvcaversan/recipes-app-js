import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testa as fucionalidades da tela de Login', () => {
  const VALID_EMAIL = 'teste@teste.com';
  const VALID_PASSWORD = '1234567';

  let historyObj = {};

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    historyObj = history;

    userEvent.type(screen.getByPlaceholderText('email', { name: /email/i }), VALID_EMAIL);
    userEvent.type(screen.getByTestId('password-input'), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(history.location.pathname).toBe('/foods');
  });
  test('Testa se o footer é renderizado com foods e drinks buttons', async () => {
    const drinksButton = await screen.findByTestId('drinks-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });
  test('Testa se os botoes de foods e drinks mudam as páginas', async () => {
    const drinksButton = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);
    expect(historyObj.location.pathname).toBe('/drinks');

    const foodButton = await screen.findByTestId('food-bottom-btn');
    userEvent.click(foodButton);
    expect(historyObj.location.pathname).toBe('/foods');
  });
});
