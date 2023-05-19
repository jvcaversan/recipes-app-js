import React, { useContext, useEffect, useState } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import PropTypes from 'prop-types';
import RecipesContext from '../context/recipesContext';
import Card from './Card';

function Recipes({ title }) {
  // const [categDefault, setCategDefault] = useState(objSetupProps.defaultCategories);
  const [isFilterOn, setisFilterOn] = useState({});
  // const BTN_ALL = 'All';
  const TWELVE = 12;
  // console.log('recipesRender ===', recipesRender);

  const {
    defaultRecipesFoods,
    defaultRecipesDrinks,
    defaultCategoriesFoods,
    defaultCategoriesDrinks,
    recipesRender,
    recipesRenderDrink,
    setRecipesRenderDrink,
    setRecipesRender,
    setcanRedirect,
  } = useContext(RecipesContext);
  // console.log(title);
  // console.log(defaultCategoriesDrinks);
  // const [recipesDefault, setRecipesDefault] = useState(defaultRecipesFoods);

  // const {
  //   title,
  //   defaultRecipes,
  //   defaultCategories,
  // } = objSetupProps;

  // ---------GET CATEGORY ID- -----------------
  // /////////////////////////////////////////
  const filterCatFoods = async (target = 'All') => {
    // console.log('target ===', target);
    if (target === 'All') {
      return setRecipesRender(defaultRecipesFoods);
    }
    if (title === 'Foods') {
      const catSelected = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target}`);
      const catSelecttedJson = await catSelected.json();
      console.log(catSelecttedJson);
      const catFiltered = catSelecttedJson.meals.filter((food, index) => index < TWELVE);
      if (catFiltered.length === 1) {
        setcanRedirect(false);
      }
      return setRecipesRender(catFiltered);
    }
    if (title === 'Drinks') {
      const catSelected = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target}`);
      const catSelecttedJson = await catSelected.json();
      const catFiltered = catSelecttedJson.drinks.filter((food, index) => index < TWELVE);
      return setRecipesRenderDrink(catFiltered);
    }
  };

  const filterAllBtn = () => {
    if (title === 'Foods') {
      setRecipesRender(defaultRecipesFoods);
      setcanRedirect(true);
    }
    if (title === 'Drinks') {
      setRecipesRenderDrink(defaultRecipesDrinks);
      setcanRedirect(true);
    }
  };

  function toggleSearch(target) {
    if (target === isFilterOn.filterName) {
      setisFilterOn({ filterName: 'All', isOn: false });
      filterAllBtn();
    } else {
      setisFilterOn({ filterName: target,
        isOn: true });
    }
    console.log(target);
    // console.log(isFilterOn);
    // if (isFilterOn === false) {
    //   console.log('filter is false');
    //   // filterCatFoods(target);
    //   // setisFilterOn(true);
    // } else {
    //   console.log('filter is true');
    //   // filterAllBtn();
    //   // setisFilterOn(false);
    // }
  }

  // function checkToggle(target) {
  //   if (isFilterOn[target] === true) {
  //     filterCatFoods(target);
  //   }
  // }

  // function checkRedirect() {
  //   if (recipesRender && recipesRender.length === 1) {
  //     setFoodId(recipesRender[0].idMeal);
  //     setRedirect(true);
  //   }
  // }

  // console.log(recipesRender);
  useEffect(() => {
    filterCatFoods(isFilterOn.filterName);
    //   setRecipesDefault(defaultRecipesFoods);
    //   // checkRedirect();
    // //   // setRecipesDefault(defaultRecipes);
    // //   // setCategDefault(defaultCategories);
    // //   // defaultCategoriesFoods.unshift({ strCategory: BTN_ALL });
  }, [isFilterOn]);
  // console.log(defaultCategoriesDrinks);
  // console.log('default recipes food', defaultRecipesFoods);
  // console.log('default category food', defaultCategoriesFoods);

  return (
    <div>
      <div>
        { title === 'Drinks'
        && defaultCategoriesDrinks.map((categoryDrinks, index) => (
          <div key={ index }>
            <button
              // className="main-buttonAdd"
              name={ categoryDrinks.strCategory }
              type="button"
              data-testid={ `${categoryDrinks.strCategory}-category-filter` }
              disabled={ false }
              onClick={ () => toggleSearch(categoryDrinks.strCategory) }
            >
              {categoryDrinks.strCategory}
            </button>
          </div>
        ))}
        { title === 'Foods'
        && defaultCategoriesFoods.map((categoryFoods, index) => (
          <div key={ index }>
            <button
              // className="main-buttonAdd"
              type="button"
              data-testid={ `${categoryFoods.strCategory}-category-filter` }
              disabled={ false }
              onClick={ () => toggleSearch(categoryFoods.strCategory) }
            >
              {categoryFoods.strCategory}
            </button>
          </div>
        ))}
        <button
          name="all"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterAllBtn() }
        >
          All
        </button>
      </div>
      <section>
        { title === 'Drinks'
        && recipesRenderDrink.filter((food, index) => index < TWELVE)
          .map((recipy, index) => (
            <Card
              title={ title }
              key={ recipy.idDrink }
              id={ recipy.idDrink }
              index={ index }
              imgurl={ recipy.strDrinkThumb }
              name={ recipy.strDrink }
              type="recipe"
            />
          ))}
        { title === 'Foods'
        && recipesRender.map((recipy, index) => (
          <Card
            title={ title }
            key={ recipy.idMeal }
            id={ recipy.idMeal }
            index={ index }
            imgurl={ recipy.strMealThumb }
            name={ recipy.strMeal }
            type="recipe"
          />
        ))}
      </section>
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
  // objSetupProps: PropTypes.objectOf.isRequired,
};

export default Recipes;
