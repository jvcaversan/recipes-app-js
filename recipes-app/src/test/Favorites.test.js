import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { storageItens } from './mocks/localStorage';

jest.mock('clipboard-copy');

describe('Teste da tela de Receitas Favoritas', () => {
  let history;
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storageItens));
    history = renderWithRouter(<App />, '/favorite-recipes').history;
  });

  test('Verifica todos os botões de filtro da tela de Receitas Favoritas', () => {
    const allFilter = screen.getByTestId('filter-by-all-btn');
    const foodsFilter = screen.getByTestId('filter-by-food-btn');
    const drinksFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(allFilter);
    userEvent.click(foodsFilter);
    userEvent.click(drinksFilter);
  });

  test('Verifica o botão de compartilhar e desfavoritar da comida', () => {
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(shareBtn);
    userEvent.click(favoriteBtn);
  });

  test('Verifica o botão de compartilhar e desfavoritar da bebida', () => {
    const shareBtn = screen.getByTestId('1-horizontal-share-btn');
    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(shareBtn);
    userEvent.click(favoriteBtn);
  });

  test('Verifica redirecionamento', () => {
    const shareBtn = screen.getByTestId('0-horizontal-image');
    userEvent.click(shareBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52977');
  });
});
