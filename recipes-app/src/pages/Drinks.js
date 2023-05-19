import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/recipesContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  const [toRedirect, setRedirect] = useState(false);
  const [drinkId, setDrinkId] = useState('');
  const {
    setTitle,
    recipesRenderDrink,
    initializeDrinkPage,
  } = useContext(RecipesContext);

  function checkRedirect() {
    if (recipesRenderDrink && recipesRenderDrink.length === 1) {
      setDrinkId(recipesRenderDrink[0].idDrink);
      setRedirect(true);
    }
  }

  useEffect(() => {
    setTitle('Drinks');
    checkRedirect();
  });

  useEffect(() => {
    initializeDrinkPage();
  }, []);

  return (
    <div>
      { toRedirect && <Redirect to={ `/drinks/${drinkId}` } />}
      <Header title="Drinks" />
      <Recipes title="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
