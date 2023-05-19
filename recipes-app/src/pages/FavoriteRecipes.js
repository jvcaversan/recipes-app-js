import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import FavBtn from '../components/FavBtn';

function FavoriteRecipes() {
  const history = useHistory();
  // const titulo = 'Done Recipes';
  const [favListRender, setFavListRender] = useState([]);
  const [favList, setFavList] = useState([]);
  // console.log('doneList ===', doneList);

  const getFavList = () => {
    const localStorageList = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavListRender(localStorageList);
    setFavList(localStorageList);
  };

  const filters = (target) => {
    console.log(target);
    if (target.name === 'foods') {
      console.log('food filter');
      const newList = favList.filter((recipe) => recipe.type === 'food');
      setFavListRender(newList);
    } if (target.name === 'drinks') {
      console.log('drink filter');
      const newList = favList.filter((recipe) => recipe.type === 'drink');
      setFavListRender(newList);
    } if (target.name === 'all') {
      console.log('all filter');
      setFavListRender(favList);
    }
  };

  const sendToDetail = (recipeFav) => {
    history.push(`${recipeFav.type}s/${recipeFav.id}`);
  };

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          name="all"
          disabled={ false }
          data-testid="filter-by-all-btn"
          onClick={ (event) => filters(event.target) }
        >
          All
        </button>
        <button
          type="button"
          name="foods"
          disabled={ false }
          data-testid="filter-by-food-btn"
          onClick={ (event) => filters(event.target) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="drinks"
          type="button"
          disabled={ false }
          onClick={ (event) => filters(event.target) }
        >
          Drinks
        </button>
      </div>
      { favListRender.map((recipeFav, index) => (
        <div key={ index }>
          <button type="button" onClick={ () => sendToDetail(recipeFav) }>
            <img
              width={ 200 }
              src={ recipeFav.image }
              alt="cardimage"
              data-testid={ `${index}-horizontal-image` }
            />
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipeFav.name }
            </h1>
          </button>
          { (recipeFav.type === 'food')
          && (
            <>
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                { `${recipeFav.nationality} - ${recipeFav.category}`}
              </h4>
              {/* { recipeFav.tags
                .filter((food, i) => i < 2)
                .map((tag, i) => (
                  <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
                ))} */}
            </>)}
          { (recipeFav.type === 'drink')
          && (
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { recipeFav.alcoholicOrNot }
            </h4>
          )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipeFav.doneDate }
            {/* 15/08/2022 */}
            {/* {
              `${recipeFav.date.dia}/${recipeFav.date.mes}/${recipeFav.date.ano}`
            } */}
          </p>
          <ShareBtn
            type="horizontal"
            index={ index }
            page={ recipeFav.type }
            id={ recipeFav.id }
          />
          {/* { console.log(recipeFav) } */}
          <FavBtn
            type="horizontal"
            mainTitle={ `${recipeFav.type}s` }
            index={ index }
            recipeObj={ recipeFav }
          />
        </div>

      ))}
    </div>
  );
}

export default FavoriteRecipes;
