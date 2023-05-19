import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/recipesContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
// import PropTypes from 'prop-types'; //

function Foods() {
  const [toRedirect, setRedirect] = useState(false);
  const [foodId, setFoodId] = useState('');
  const {
    // defaultRecipesFoods,
    // defaultCategoriesFoods,
    setTitle,
    // listFoods,
    recipesRender,
    // loading,
    initializeFoodPage,
    canItRedirect,
  } = useContext(RecipesContext);
  // console.log('defaultRecipesFoods ====', defaultRecipesFoods);
  // const [test, setTest] = useState(defaultRecipesFoods);
  // console.log('listFoods ====', listFoods);

  // const objSetup = {
  //   title: 'Foods',
  //   defaultRecipes: defaultRecipesFoods,
  //   defaultCategories: defaultCategoriesFoods,
  // };
  // console.log('objSetup Before ===', objSetup);

  function checkRedirect() {
    if (canItRedirect && recipesRender.length === 1) {
      setFoodId(recipesRender[0].idMeal);
      setRedirect(true);
    }
  }

  useEffect(() => {
    setTitle('Foods');
    checkRedirect();
    // checkRedirect();
  });

  useEffect(() => {
    initializeFoodPage();
  }, []);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      { toRedirect && <Redirect to={ `/foods/${foodId}` } /> }
      <Header title="Foods" />
      <Recipes title="Foods" />
      {/* defaultRecipesFoods
        ? <Recipes title="Foods" />
  : global.alert('Sorry, we haven\'t found any recipes for these filters.') */}
      <div>
        <Footer />
      </div>
    </>
  );
}

/* Recipes.propTypes = {
  objSetupProps: PropTypes.objectOf.isRequired,
  title: PropTypes.string.isRequired,
};
 */
export default Foods;
