import React, { /* useContext, */ useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareBtn from '../components/ShareBtn';
import FavBtn from '../components/FavBtn';
import ListIngredients from '../components/ListIngredients';
// import recipesContext from '../context/recipesContext';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const mainTitle = pathname.split('/')[1];
  const recipyID = pathname.split('/')[2];
  const [recipeObj, setRecipeObj] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const FIFTEEN = 15;
  const [isBtnDisabled, setBtnDisabled] = useState(true);
  const [doneList, setDoneList] = useState([]);

  const getDoneList = () => {
    const localStorageList = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    setDoneList(localStorageList);
  };

  const dateNow = () => {
    const now = new Date();

    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const fullDate = `${dia}/${mes}/${ano}`;
    return fullDate;
    // console.log('teste DATE ====', dataAtual);
  };

  const buildObj = (objToBuild) => {
    let recipeAddObj = {};
    if (mainTitle === 'foods') {
      recipeAddObj = {
        id: objToBuild.idMeal,
        type: 'food',
        nationality: objToBuild.strArea,
        category: objToBuild.strCategory,
        alcoholicOrNot: '',
        name: objToBuild.strMeal,
        image: objToBuild.strMealThumb,
        date: dateNow(),
      };
    } else {
      recipeAddObj = {
        id: objToBuild.idDrink,
        type: 'drink',
        nationality: '',
        category: objToBuild.strCategory,
        alcoholicOrNot: objToBuild.strAlcoholic,
        name: objToBuild.strDrink,
        image: objToBuild.strDrinkThumb,
        date: dateNow(),

      };
    }
    return recipeAddObj;
  //   favList.push(recipeAddObj);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
  };

  const sendToStorage = () => {
    let objDone = {};
    // console.log(recipeObj);
    if (mainTitle === 'foods') {
      const arrayTags = recipeObj.strTags ? recipeObj.strTags.split(',') : [];
      objDone = {
        id: recipeObj.idMeal,
        type: 'food',
        nationality: recipeObj.strArea,
        category: recipeObj.strCategory,
        alcoholicOrNot: '',
        name: recipeObj.strMeal,
        image: recipeObj.strMealThumb,
        doneDate: dateNow(),
        tags: arrayTags,
      };
    } else {
      const arrayTags = recipeObj.strTags ? recipeObj.strTags.split(',') : [];
      objDone = {
        id: recipeObj.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeObj.strCategory,
        alcoholicOrNot: recipeObj.strAlcoholic,
        name: recipeObj.strDrink,
        image: recipeObj.strDrinkThumb,
        doneDate: dateNow(),
        tags: arrayTags,
      };
    }
    // console.log('storage ====', doneList);
    // console.log('storage.length ===', storage.length);
    // console.log('storage.type ===', storage.type);

    if (doneList.length === undefined || doneList === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([objDone]));
      history.push('/done-recipes');
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneList, objDone]));
      history.push('/done-recipes');
    }
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

  const recipeAPI = async () => {
    if (mainTitle === 'foods') {
      const foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipyID}`;
      const foodFetch = await fetch(foodUrl);
      const foodJson = await foodFetch.json();
      const food = foodJson.meals[0];
      setRecipeObj(food);
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

  useEffect(() => {
    // if (!localStorage.getItem('inProgressRecipes')) {
    //   localStorage.setItem('inProgressRecipes', JSON.stringify({meals: {}, cocktails: {}}));
    // }
    recipeAPI();
    getDoneList();
    // checkLocal();
  }, []);

  /* useEffect(() => {
    handleCkeck();
    // checkLocal();
  }, [ingredient]); */

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
      <div>
        <ShareBtn
          type="normal"
          page={ mainTitle }
          id={ recipyID }
        />
        <FavBtn mainTitle={ mainTitle } recipeObj={ buildObj(recipeObj) } type="normal" />
      </div>
      <h2 data-testid="recipe-category">
        { (mainTitle === 'foods')
          ? recipeObj.strCategory
          : recipeObj.strAlcoholic }
      </h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredient.map((ingred, index) => (
          <ListIngredients
            key={ index }
            setBtnDisabledProps={ setBtnDisabled }
            nbrIgr={ ingredient.length }
            recipyIDProps={ recipyID }
            mainTitleProps={ mainTitle }
            ingredientProps={ ingred }
            indexProps={ index }
          />
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p data-testid="instructions">{ recipeObj.strInstructions }</p>
      <button
        type="button"
        disabled={ isBtnDisabled }
        data-testid="finish-recipe-btn"
        className="footer"
        onClick={ () => sendToStorage() }
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default RecipeInProgress;
