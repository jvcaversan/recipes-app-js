// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getElementsSearchBar } from './constants';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================
let globalHistory = '';
const elements = getElementsSearchBar();
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente SearchBar.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, '/foods');
    globalHistory = history;
  });

  it('verifica os elementos do componente quando clicado', () => {
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    // 2. Interagir com os elementos(caso necessario):
    userEvent.click(searchBtn);

    // 3. Fazer os testes:
    elements.forEach((el) => {
      const elementTestId = screen.getByTestId(el);
      expect(elementTestId).toBeInTheDocument(el);
    });
  });

  it('verifica se ao clicar novamente os elementos somem da tela', () => {
    // console.log(elements);
    // 1. Acessar os elementos na tela;
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    // 2. Interagir com os elementos(caso necessario):
    userEvent.click(searchBtn);
    const elementTestId = screen.getByTestId(elements[0]);
    expect(elementTestId).toBeInTheDocument();

    // 3. Fazer os testes:
    userEvent.click(searchBtn);
    expect(elementTestId).not.toBeInTheDocument();
  });

  it('verifica a rota do componente', () => {
    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/foods');
  });
});
// ============--------------DESCRIBE FOODS---------------==============
// =====================================================================
describe('verifica os testes do componente na pagina foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/foods');
    globalHistory = history;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('verifica o retorno da listagem por ingredientes ', async () => {
    // 1. Acessar os elementos na tela:
    const btnToggleSearch = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnToggleSearch);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioBtnIngredients = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchBtn).toBeInTheDocument();

    // 2. Interagir com os elementos(caso necessario):
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(radioBtnIngredients);
    userEvent.click(searchBtn);

    // 3. Fazer os testes
    const chickenCardSearched = await screen.findByRole('heading', {
      name: /brown stew chicken/i,
    });
    const chickenCardText = chickenCardSearched.innerHTML;
    expect(chickenCardText).toBe('Brown Stew Chicken');
  });

  it('verifica o retorno da listagem por nome', async () => {
    // 1. Acessar os elementos na tela:
    const btnToggleSearch = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnToggleSearch);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioBtnName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchBtn).toBeInTheDocument();

    // 2. Interagir com os elementos(caso necessario):
    userEvent.type(searchInput, 'soup');
    userEvent.click(radioBtnName);
    userEvent.click(searchBtn);

    // 3. Fazer os testes
    const soupCardSearched = await screen.findByRole('heading', {
      name: /Leblebi Soup/i,
    });
    const soupCardText = soupCardSearched.innerHTML;
    expect(soupCardText).toBe('Leblebi Soup');
  });

  it('testa se redireciona para tela de details, caso unico resultado ', async () => {
    const btnToggleSearch = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnToggleSearch);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioBtnName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(radioBtnName);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(searchBtn);

    const titleCateg = await screen.findByTestId('recipe-category');
    expect(titleCateg).toBeInTheDocument();

    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/foods/52771');
  });
  it('testa os botões de categorias', () => {
    const title = screen.getByRole('heading', {
      name: /foods/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
    const beef = screen.getByTestId('Beef-category-filter');
    expect(beef).toBeInTheDocument();
    const breakfast = screen.getByTestId('Breakfast-category-filter');
    expect(breakfast).toBeInTheDocument();
    const chicken = screen.getByTestId('Chicken-category-filter');
    expect(chicken).toBeInTheDocument();
    const dessert = screen.getByTestId('Dessert-category-filter');
    expect(dessert).toBeInTheDocument();
    const goat = screen.getByTestId('Goat-category-filter');
    expect(goat).toBeInTheDocument();
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const titleD = screen.getByRole('heading', {
      name: /drinks/i,
      level: 1,
    });
    expect(titleD).toBeInTheDocument();
  });
  it('testa o click dos botões de categeria de comida', () => {
    const title = screen.getByRole('heading', {
      name: /foods/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
    const beef = screen.getByTestId('Beef-category-filter');
    expect(beef).toBeInTheDocument();
    userEvent.click(beef);
  });
  it('testa o click do botão All de categoria', () => {
    const title = screen.getByRole('heading', {
      name: /foods/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
    const all = screen.getByTestId('All-category-filter');
    expect(all).toBeInTheDocument();
    userEvent.click(all);
  });

  it('verifica renderização sem login', () => {
    window.localStorage.clear();
    globalHistory.push('/profile');
  });
  it('verifica se é redirecionado para os detalhes da comida', () => {
    const food = screen.getByTestId('0-recipe-card');
    expect(food).toBeInTheDocument();
    userEvent.click(food);
    const { location: { pathname } } = globalHistory;
    expect(pathname).toBe('/foods/52977');
  });
});
