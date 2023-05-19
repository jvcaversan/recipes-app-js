import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import ShareBtn from './ShareBtn';
import FavBtn from './FavBtn';
import Card from './Card';

function RecipeDetails() {
  const { defaultRecipesDrinks, defaultRecipesFoods } = useContext(recipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const mainTitle = pathname.split('/')[1];
  const recipyID = pathname.split('/')[2];
  const [recipeObj, setRecipeObj] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [isBtnContinue, setBtnContinue] = useState(false);
  const [ytUrl, setYtUrl] = useState('');
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : { cocktails: {}, meals: {} };
  const FIFTEEN = 15;
  const SIX = 6;

  const checkLocal = () => {
    const { cocktails, meals } = inProgress;
    const mealsOrFoods = mainTitle === 'foods' ? meals : cocktails;
    const isDisable = doneRecipes.some((receita) => receita.id === recipyID);
    setBtnDisabled(isDisable);
    const progressRecipy = Object.keys(mealsOrFoods).some((id) => id === recipyID);
    setBtnContinue(progressRecipy);
  };

  function saveIngredient(fullRecipe) {
    const ingrArray = [];
    for (let nmbr = 1; nmbr <= FIFTEEN; nmbr += 1) {
      if (fullRecipe[`strIngredient${nmbr}`]) {
        ingrArray.push({
          ingr: fullRecipe[`strIngredient${nmbr}`],
          measure: fullRecipe[`strMeasure${nmbr}`] || '',
        });
      }
    }
    setIngredient(ingrArray);
  }

  function fixUrl(YouTubeUrl) {
    const newUrl = YouTubeUrl.replace('watch?v=', 'embed/');
    setYtUrl(newUrl);
  }

  const recipeAPI = async () => {
    if (mainTitle === 'foods') {
      const foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipyID}`;
      const foodFetch = await fetch(foodUrl);
      const foodJson = await foodFetch.json();
      const food = foodJson.meals[0];
      setRecipeObj(food);
      fixUrl(food.strYoutube);
      saveIngredient(food);
    } if (mainTitle === 'drinks') {
      const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipyID}`;
      const drinkFetch = await fetch(drinkUrl);
      const drinkJson = await drinkFetch.json();
      const drink = drinkJson.drinks[0];
      setRecipeObj(drink);
      saveIngredient(drink);
    }
  };

  const startBtn = () => {
    history.push(`/${mainTitle}/${recipyID}/in-progress`);
  };

  const editObj = () => {
    let recipeAddObj = {};
    if (mainTitle === 'foods') {
      recipeAddObj = {
        id: recipeObj.idMeal,
        type: 'food',
        nationality: recipeObj.strArea,
        category: recipeObj.strCategory,
        alcoholicOrNot: '',
        name: recipeObj.strMeal,
        image: recipeObj.strMealThumb,
      };
    } else {
      recipeAddObj = {
        id: recipeObj.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeObj.strCategory,
        alcoholicOrNot: recipeObj.strAlcoholic,
        name: recipeObj.strDrink,
        image: recipeObj.strDrinkThumb,
      };
    }
    return recipeAddObj;
  };

  useEffect(() => {
    recipeAPI();
    checkLocal();
  }, []);

  return (
    <section>
      <img
        src={ (mainTitle === 'foods')
          ? recipeObj.strMealThumb
          : recipeObj.strDrinkThumb }
        alt={ (mainTitle === 'foods')
          ? recipeObj.strMeal
          : recipeObj.strDrink }
        width={ 200 }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { (mainTitle === 'foods')
          ? recipeObj.strMeal
          : recipeObj.strDrink }
      </h1>
      <h2 data-testid="recipe-category">
        { (mainTitle === 'foods')
          ? recipeObj.strCategory
          : recipeObj.strAlcoholic }
      </h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredient.map((ingred, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingred.ingr}${ingred.measure}`}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p data-testid="instructions">{ recipeObj.strInstructions }</p>
      { (mainTitle === 'foods')
        && (
          <iframe
            data-testid="video"
            width="420"
            height="315"
            src={ ytUrl }
            title={ `${recipeObj.strMeal} recipy` }
          />) }
      <div className="carousel" style={ { overflowX: 'auto', display: 'flex' } }>
        { (mainTitle === 'foods')
          ? (defaultRecipesDrinks.slice(0, SIX)
            .map((recipy, index) => (
              <Card
                title={ mainTitle }
                key={ recipy.idDrink }
                id={ recipy.idDrink }
                index={ index }
                imgurl={ recipy.strDrinkThumb }
                name={ recipy.strDrink }
                type="recomendation"
              />
            ))
          )
          : (defaultRecipesFoods.slice(0, SIX)
            .map((recipy, index) => (
              <Card
                title={ mainTitle }
                key={ recipy.idMeal }
                id={ recipy.idMeal }
                index={ index }
                imgurl={ recipy.strMealThumb }
                name={ recipy.strMeal }
                type="recomendation"
              />
            ))
          ) }
      </div>
      { !isBtnDisabled
        && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="footer"
            onClick={ startBtn }
          >
            {isBtnContinue
              ? 'Continue Recipe'
              : 'Start Recipe'}
          </button>)}
      <ShareBtn
        type="normal"
        page={ mainTitle }
        id={ recipyID }
      />
      <FavBtn recipeObj={ editObj() } mainTitle={ mainTitle } type="normal" />
    </section>
  );
}

export default RecipeDetails;
