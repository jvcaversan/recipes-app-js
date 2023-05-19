import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [radioSelected, setRadioSelected] = useState('');
  const [inputSearched, setInputSearched] = useState('');
  const [pageTitle, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [defaultRecipesFoods, setDefaultRecipesFoods] = useState([]);
  const [defaultRecipesDrinks, setDefaultRecipesDrinks] = useState([]);
  const [defaultCategoriesFoods, setDefaultCategoriesFoods] = useState([]);
  const [defaultCategoriesDrinks, setDefaultCategoriesDrinks] = useState([]);
  const [recipesRender, setRecipesRender] = useState([]);
  const [recipesRenderDrink, setRecipesRenderDrink] = useState([]);
  const [canItRedirect, setcanRedirect] = useState(true);
  const TWELVE = 12;
  const FIVE = 5;
  const alertText = 'Sorry, we haven\'t found any recipes for these filters.';
  const [arrayInProgress, setArrayInProgress] = useState(true);

  const getIngredient = async (ingredient) => {
    if (pageTitle === 'Foods') {
      const foodIngr = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const foodIngrJson = await foodIngr.json();
      if (!foodIngrJson.meals) {
        global.alert(alertText);
        setRecipesRender(defaultRecipesFoods);
      } else {
        setRecipesRender(foodIngrJson.meals);
      }
    } if (pageTitle === 'Drinks') {
      const drinkIngr = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const drinkIngrJson = await drinkIngr.json();
      if (!drinkIngrJson.drinks) {
        global.alert(alertText);
        setRecipesRenderDrink(defaultRecipesDrinks);
      } else {
        setRecipesRenderDrink(drinkIngrJson.drinks);
      }
    }
  };

  const getName = async (name) => {
    if (pageTitle === 'Foods') {
      const reqName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const nameJson = await reqName.json();
      if (!nameJson.meals) {
        global.alert(alertText);
        setRecipesRender(defaultRecipesFoods);
      } else {
        setRecipesRender(nameJson.meals);
      }
    } if (pageTitle === 'Drinks') {
      const drinkName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      const drinkNameJson = await drinkName.json();
      if (!drinkNameJson.drinks) {
        global.alert(alertText);
        setRecipesRenderDrink(defaultRecipesDrinks);
      } else {
        setRecipesRenderDrink(drinkNameJson.drinks);
      }
    }
  };

  const getLetter = async (letter) => {
    if (pageTitle === 'Foods') {
      const reqLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const letterJson = await reqLetter.json();
      if (!letterJson.meals) {
        global.alert(alertText);
        setRecipesRender(defaultRecipesFoods);
      } else {
        setRecipesRender(letterJson.meals);
      }
    } if (pageTitle === 'Drinks') {
      const drinkLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      const drinkLetterJson = await drinkLetter.json();
      if (!drinkLetterJson.drinks) {
        global.alert(alertText);
        setRecipesRenderDrink(defaultRecipesDrinks);
      } else {
        setRecipesRenderDrink(drinkLetterJson.drinks);
      }
    }
  };

  const handleSelectedAPIServices = () => {
    const NUMBER_LENGHT = 1;
    if (radioSelected === 'firstLetter' && inputSearched.length > NUMBER_LENGHT) {
      global.alert('Your search must have only 1 (one) character');
    }

    switch (radioSelected) {
    case 'ingredient':
      return getIngredient(inputSearched);
    case 'nameRecipe':
      return getName(inputSearched);
    case 'firstLetter':
      return getLetter(inputSearched);
    default:
      return true;
    }
  };

  const getCategoriesListFoods = async () => {
    const foodListCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const foodCategoriesJson = await foodListCategories.json();
    const catFoods = foodCategoriesJson.meals.filter((food, index) => index < FIVE);
    setDefaultCategoriesFoods(catFoods);
  };
  const getCategoriesListDrinks = async () => {
    const drinkListCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const drinkCategoriesJson = await drinkListCategories.json();
    const catDrinks = drinkCategoriesJson.drinks.filter((drink, index) => index < FIVE);
    setDefaultCategoriesDrinks(catDrinks);
  };

  const getRecipyListFoods = async () => {
    const foodList = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodListJson = await foodList.json();
    const toSave = foodListJson.meals.filter((food, index) => index < TWELVE);
    // console.log(toSave);
    setRecipesRender(toSave);
    setDefaultRecipesFoods(toSave);
  };
  const getRecipyListDrinks = async () => {
    const drinkList = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkListJson = await drinkList.json();
    const toSave = drinkListJson.drinks.filter((drink, index) => index < TWELVE);
    setRecipesRenderDrink(toSave);
    // console.log(toSave);
    setDefaultRecipesDrinks(toSave);
  };

  async function initializeFoodPage() {
    await getCategoriesListFoods();
  }
  async function initializeDrinkPage() {
    await getCategoriesListDrinks();
  }

  const INITIAL_PROGRESS_RECIPES = {
    cocktails: {},
    meals: {},
  };
  useEffect(() => {
    const inicialLocalStorage = () => {
      if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify([]));
      }
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify(INITIAL_PROGRESS_RECIPES));
      }
    };
    inicialLocalStorage();
  }, []);

  useEffect(() => {
    getRecipyListFoods();
    getRecipyListDrinks();
  }, []);

  const context = {
    radioSelected,
    setRadioSelected,
    inputSearched,
    setInputSearched,
    setTitle,
    handleSelectedAPIServices,
    user,
    setUser,
    defaultRecipesDrinks,
    defaultRecipesFoods,
    defaultCategoriesFoods,
    defaultCategoriesDrinks,
    setRecipesRender,
    recipesRender,
    recipesRenderDrink,
    setRecipesRenderDrink,
    initializeFoodPage,
    initializeDrinkPage,
    canItRedirect,
    setcanRedirect,
    arrayInProgress,
    setArrayInProgress,
  };

  return (
    <recipesContext.Provider value={ context }>
      { children }
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
