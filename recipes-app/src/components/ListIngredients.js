import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

function ListIngredients({
  recipyIDProps, mainTitleProps, ingredientProps,
  indexProps, setBtnDisabledProps, nbrIgr }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => {
    // console.log('nbrIgr ===', nbrIgr);
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealsOrFoods = mainTitleProps === 'foods' ? 'meals' : 'cocktails';
    const getStorageByID = getStorage ? getStorage[mealsOrFoods][recipyIDProps] : [];

    if (getStorageByID === null || getStorageByID === undefined) {
      return setBtnDisabledProps(true);
    } if (nbrIgr === getStorageByID.length) {
      // console.log('getStorageByID.LENGTH ===', getStorageByID.length);
      return setBtnDisabledProps(false);
    }
  };

  const handleOnChange = ({ target }) => {
    const mealsOrFoods = mainTitleProps === 'foods' ? 'meals' : 'cocktails';
    const listInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayToFind = listInProgress[mealsOrFoods][recipyIDProps];

    if (arrayToFind === undefined || arrayToFind === null) {
      const objStorage = {
        ...listInProgress,
        [mealsOrFoods]: {
          [recipyIDProps]: [ingredientProps.ingr],
        },
      };
      // console.log('objStorage ====', objStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(objStorage));
    }
    if (target.checked && arrayToFind) {
      const objStorage = {
        ...listInProgress,
        [mealsOrFoods]: {
          [recipyIDProps]: [...listInProgress[mealsOrFoods][recipyIDProps],
            ingredientProps.ingr],
        },
      };
      // console.log('objStorage ===', objStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(objStorage));
    } else if (listInProgress[mealsOrFoods][recipyIDProps]) {
      const objStorage = {
        ...listInProgress,
        [mealsOrFoods]: {
          [recipyIDProps]: [
            ...listInProgress[mealsOrFoods][recipyIDProps]
              .filter((igr) => igr !== ingredientProps.ingr),
          ],
        },
      };
      // console.log('objStorage ===', objStorage);
      setBtnDisabledProps(true);
      localStorage.setItem('inProgressRecipes', JSON.stringify(objStorage));
    }
    setIsChecked(!isChecked);
  };

  const funcTest = () => {
    const mealsOrFoods = mainTitleProps === 'foods' ? 'meals' : 'cocktails';
    const listInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayToFind = listInProgress[mealsOrFoods][recipyIDProps];

    if (arrayToFind === undefined) {
      return false;
    }
    const check = arrayToFind.some((igr) => igr === ingredientProps.ingr);
    return check;
  };

  useEffect(() => {
    handleCheck();
  }, [isChecked]);

  return (
    <li
      className="list-ingredients"
      data-testid={ `${indexProps}-ingredient-step` }
      style={ {
        textDecoration: funcTest() ? 'line-through' : '',
      } }
    >
      <label
        htmlFor={ `${indexProps}-ingredient-checkbox` }
      >
        <input
          data-testid={ `${indexProps}-ingredient-checkbox` }
          id={ `${indexProps}-ingredient-checkbox` }
          type="checkbox"
          checked={ funcTest() }
          onChange={ (e) => handleOnChange(e) }
        />
        {`${ingredientProps.ingr}${ingredientProps.measure}`}
      </label>
    </li>
  );
}

ListIngredients.propTypes = {
  mainTitleProps: propTypes.string.isRequired,
  ingredientProps: propTypes.oneOfType([
    propTypes.object,
  ]).isRequired,
  indexProps: propTypes.number.isRequired,
  recipyIDProps: propTypes.string.isRequired,
  setBtnDisabledProps: propTypes.func.isRequired,
  nbrIgr: propTypes.number.isRequired,
};

export default ListIngredients;
