import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Details from './pages/Details';
import RecipeInProgress from './pages/RecipeInProgress';
import './App.css';
import RecipesProvider from './context/recipesProvider';
//

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/foods/:id" component={ Details } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id" component={ Details } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
