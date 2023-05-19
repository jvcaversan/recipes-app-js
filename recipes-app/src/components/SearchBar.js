// ==================================-------------------COMPONENT-SEARCHBAR--------------------==================================
// ------------------------------------------------------------------------------------------------------------------------------

// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';

function SearchBar() {
  // ============-------------HOOKS STATE SCOPE-------------==============
  // =====================================================================
  const {
    // listIngredients,
    radioSelected,
    setRadioSelected,
    inputSearched,
    setInputSearched,
    handleSelectedAPIServices,
  } = useContext(RecipesContext);

  // FUNCTION : handleOnClick-----------------------------------------===
  // describe : Recupera os dados e salva no estado-------------------===
  const handleOnClick = () => {
    handleSelectedAPIServices();
    // console.log(listIngredients);
  };

  // ============---------------USEEFFECT SCOPE-------------============
  // ===================================================================
  useEffect(() => {
  }, []);

  // ============----------------RETURN SCOPE---------------==============
  // =====================================================================
  return (
    <div>
      <div>
        <input
          // className="input-value"
          // name="searchInput"
          data-testid="search-input"
          type="text"
          placeholder="Search Recipe"
          onChange={ ({ target }) => setInputSearched(target.value) }
          value={ inputSearched }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="ingredient"
            id="ingredient"
            value="ingredient"
            checked={ radioSelected === 'ingredient' }
            onChange={ ({ target }) => setRadioSelected(target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="nameRecipe">
          <input
            type="radio"
            name="nameRecipe"
            id="nameRecipe"
            value="nameRecipe"
            checked={ radioSelected === 'nameRecipe' }
            onChange={ ({ target }) => setRadioSelected(target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="firstLetter"
            id="firstLetter"
            value="firstLetter"
            checked={ radioSelected === 'firstLetter' }
            onChange={ ({ target }) => setRadioSelected(target.value) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <div>
        <button
          // className="main-buttonAdd"
          type="button"
          data-testid="exec-search-btn"
          disabled={ false }
          onClick={ handleOnClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
