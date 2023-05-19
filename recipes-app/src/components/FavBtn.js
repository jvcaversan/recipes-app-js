import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
// import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

function FavBtn({ recipeObj, type, index, mainTitle }) {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  // const mainTitle = pathname.split('/')[1];
  const [favList, setFavList] = useState([]);
  const [iconToUse, setIcon] = useState('');
  const [testId, setTestId] = useState('');
  // console.log(recipeObj);

  const getFavList = () => {
    const localStorageList = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavList(localStorageList);
  };

  const defineTestId = () => {
    if (type === 'horizontal') {
      setTestId(`${index}-horizontal-favorite-btn`);
    } else {
      setTestId('favorite-btn');
    }
  };

  useEffect(() => {
    defineTestId();
  });

  const buildObj = (fullObj) => {
    // console.log(fullObj);
    let recipeAddObj = {};
    if (mainTitle === 'foods') {
      recipeAddObj = {
        id: fullObj.id,
        type: 'food',
        nationality: fullObj.nationality,
        category: fullObj.category,
        alcoholicOrNot: '',
        name: fullObj.name,
        image: fullObj.image,
      };
    } else {
      recipeAddObj = {
        id: fullObj.id,
        type: 'drink',
        nationality: '',
        category: fullObj.category,
        alcoholicOrNot: fullObj.alcoholicOrNot,
        name: fullObj.name,
        image: fullObj.image,
      };
    }
    // console.log(recipeAddObj);
    return recipeAddObj;
  };

  const checkIcon = () => {
    const toCompare = buildObj(recipeObj);
    // console.log(recipeObj);
    // console.log('list', favList);
    // console.log('obj', toCompare);
    if (favList.some((item) => (item.id === toCompare.id))) {
      // console.log('checkicon includes');
      setIcon(blackHeart);
    } else {
      // console.log('checkicon dont include');
      setIcon(whiteHeart);
    }
  };

  const handleFavorite = () => {
    const toCompare = buildObj(recipeObj);
    // console.log(favList);
    if (favList.some((item) => (item.id === toCompare.id))) {
      const newFavList = favList.filter((item) => (item.id !== toCompare.id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setFavList(newFavList);
      checkIcon();
      // console.log('handle fav include');
    } else {
      const formedObj = buildObj(recipeObj);
      favList.push(formedObj);
      // console.log(favList);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
      checkIcon();
      // console.log('handle fav dont includes');
    }
  };

  useEffect(() => {
    getFavList();
    checkIcon();
  }, []);

  useEffect(() => {
    checkIcon();
  });

  return (
    <button onClick={ handleFavorite } type="button">
      Favorite
      <img
        width={ 100 }
        height={ 100 }
        data-testid={ testId }
        src={ iconToUse }
        alt="icone favorite btn"
      />
    </button>
  );
}

FavBtn.defaultProps = {
  index: 0,
};

FavBtn.propTypes = {
  recipeObj: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  mainTitle: PropTypes.string.isRequired,
};

export default FavBtn;
