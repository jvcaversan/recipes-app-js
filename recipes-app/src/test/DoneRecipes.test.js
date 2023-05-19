// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

// ============----------------GLOBAL SCOPE---------------==============
// =====================================================================
let globalHistory = '';
const IMAGE = '0-horizontal-image';
const TOP_TEXT = '0-horizontal-top-text';
const UNHEALTHY_TAG = '0-Streetfood-horizontal-tag';
const SPECIALITY_TAG = '0- Onthego-horizontal-tag';
const BTN_FINISH = 'finish-recipe-btn';
const ROUTE = '/done-recipes';
const CHECKBOX_1 = '0-ingredient-checkbox';
const CHECKBOX_2 = '1-ingredient-checkbox';
const CHECKBOX_3 = '2-ingredient-checkbox';
const CHECKBOX_4 = '3-ingredient-checkbox';
const CHECKBOX_5 = '4-ingredient-checkbox';
const CHECKBOX_6 = '5-ingredient-checkbox';
const DATE_NOW = '23/06/2020';
const NAME_TEST = 'Spicy Arrabiata Penne';
const mockStorage = [{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: NAME_TEST,
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: DATE_NOW,
  tags: ['Pasta', 'Curry'],
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: DATE_NOW,
  tags: [],
}];

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente Done Recipes em foods', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, '/foods/53060/in-progress');
    globalHistory = history;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('verifica os elementos do componente done recipes', async () => {
    const igr1 = await screen.findByTestId(CHECKBOX_1);
    const igr2 = await screen.findByTestId(CHECKBOX_2);
    const igr3 = await screen.findByTestId(CHECKBOX_3);
    const igr4 = await screen.findByTestId(CHECKBOX_4);
    const igr5 = await screen.findByTestId(CHECKBOX_5);
    const igr6 = await screen.findByTestId(CHECKBOX_6);

    userEvent.click(igr1);
    userEvent.click(igr2);
    userEvent.click(igr3);
    userEvent.click(igr4);
    userEvent.click(igr5);
    userEvent.click(igr6);

    const btnFinish = await screen.findByTestId(BTN_FINISH);
    userEvent.click(btnFinish);
    expect(globalHistory.location.pathname).toBe(ROUTE);

    const allBtn = screen.getByText(/All/i);
    const foodBtn = screen.getByTestId(/filter-by-food-btn/i);
    const drinksBtn = screen.getByText(/Drinks/i);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    const elTitle = screen.getByTestId(/0-horizontal-name/i);
    const elImg = screen.getByTestId(IMAGE);
    const elText = screen.getByTestId(TOP_TEXT);
    const elTag1 = screen.getByTestId(UNHEALTHY_TAG);
    const elTag2 = screen.getByTestId(SPECIALITY_TAG);

    expect(elTitle).toBeInTheDocument();
    expect(elImg).toBeInTheDocument();
    expect(elText).toBeInTheDocument();
    expect(elTag1).toBeInTheDocument();
    expect(elTag2).toBeInTheDocument();

    userEvent.click(elImg);
    const { location: { pathname } } = globalHistory;
    console.log('pathname ===', pathname);
    expect(pathname).toBe('/foods/53060');
  });
});

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente Done Recipes em Drinks', () => {
  it('verifica os elementos do componente', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/17203/in-progress');
    const igr1 = await screen.findByTestId(CHECKBOX_1);
    const igr2 = await screen.findByTestId(CHECKBOX_2);

    userEvent.click(igr1);
    userEvent.click(igr2);

    const btnFinish = await screen.findByTestId(BTN_FINISH);
    expect(btnFinish).toBeVisible();
    userEvent.click(btnFinish);
    expect(history.location.pathname).toBe(ROUTE);

    const allBtn = screen.getByText(/All/i);
    const foodBtn = screen.getByTestId(/filter-by-food-btn/i);
    const drinksBtn = screen.getByText(/Drinks/i);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    const elTitle = screen.getByTestId(/1-horizontal-name/i);
    const elImg = screen.getByTestId('1-horizontal-image');
    console.log('elTitle AQUIIII ===', elImg);
    const elText = screen.getByTestId(TOP_TEXT);

    expect(elTitle).toBeInTheDocument();
    expect(elImg).toBeInTheDocument();
    expect(elText).toBeInTheDocument();

    userEvent.click(elImg);

    const elTitleDetails = await screen.findByRole('heading', {
      name: /kir/i,
    });

    expect(elTitleDetails).toBeInTheDocument();
    // await waitFor(() => {
    const testPath = history.location.pathname;
    console.log(testPath);
    expect(testPath).toBe('/drinks/17203');
    // });
  });
});

// ============--------------DESCRIBE SCOPE---------------==============
// =====================================================================
describe('verifica os testes do componente Done Recipes em foods', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockImplementation(fetch);
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: NAME_TEST,
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: DATE_NOW,
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: DATE_NOW,
      tags: [],
    }]));
    const { history } = renderWithRouter(<App />, '/done-recipes');
    globalHistory = history;
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('verifica o filtro por Foods', async () => {
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getStorage).toEqual(mockStorage);

    const foodBtn = screen.getByTestId(/filter-by-food-btn/i);
    const elTitle = screen.getByTestId(/0-horizontal-name/i);

    userEvent.click(foodBtn);

    expect(elTitle.textContent).toBe(NAME_TEST);
  });

  it('verifica o filtro por Drinks', async () => {
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getStorage).toEqual(mockStorage);

    const drinksBtn = screen.getByText(/Drinks/i);
    const elTitle = screen.getByTestId(/0-horizontal-name/i);

    userEvent.click(drinksBtn);

    expect(elTitle.textContent).toBe('Aquamarine');
  });

  it('verifica o filtro por Drinks', async () => {
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getStorage).toEqual(mockStorage);

    const AllBtn = screen.getByText(/All/i);
    const elTitle1 = screen.getByTestId(/0-horizontal-name/i);
    const elTitle2 = screen.getByTestId(/1-horizontal-name/i);

    userEvent.click(AllBtn);
    expect(elTitle1.textContent).toBe('Spicy Arrabiata Penne');
    expect(elTitle2.textContent).toBe('Aquamarine');
  });
});
