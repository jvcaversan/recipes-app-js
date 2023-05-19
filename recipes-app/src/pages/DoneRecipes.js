import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

function DoneRecipes() {
  const history = useHistory();
  const titulo = 'Done Recipes';
  const [doneListRender, setDoneListRender] = useState([]);
  const [doneList, setDoneList] = useState([]);
  // console.log('doneList ===', doneList);

  const getDoneList = () => {
    const localStorageList = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    setDoneListRender(localStorageList);
    setDoneList(localStorageList);
  };

  // const handleShare = () => {
  //   copy(`http://localhost:3000${pathname}`);
  //   setCopied(true);
  // };

  const filters = (target) => {
    // console.log(target);
    if (target.name === 'foods') {
      // console.log('food filter');
      const newList = doneList.filter((recipe) => recipe.type === 'food');
      setDoneListRender(newList);
    } if (target.name === 'drinks') {
      // console.log('drink filter');
      const newList = doneList.filter((recipe) => recipe.type === 'drink');
      setDoneListRender(newList);
    } if (target.name === 'all') {
      // console.log('all filter');
      setDoneListRender(doneList);
    }
  };

  const sendToDetail = (recipeDone) => {
    history.push(`${recipeDone.type}s/${recipeDone.id}`);
  };

  useEffect(() => {
    getDoneList();
  }, []);

  return (
    <div>
      <Header title={ titulo } />
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
      { doneListRender.map((recipeDone, index) => (
        <div key={ index }>
          <button type="button" onClick={ () => sendToDetail(recipeDone) }>
            <img
              width={ 200 }
              src={ recipeDone.image }
              alt="cardimage"
              data-testid={ `${index}-horizontal-image` }
            />
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipeDone.name }
            </h1>
          </button>
          { (recipeDone.type === 'food')
          && (
            <>
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                { `${recipeDone.nationality} - ${recipeDone.category}`}
              </h4>
              { recipeDone.tags
                .filter((food, i) => i < 2)
                .map((tag, i) => (
                  <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
                ))}
            </>)}
          { (recipeDone.type === 'drink')
          && (
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { recipeDone.alcoholicOrNot }
            </h4>
          )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipeDone.doneDate }
            {/* 15/08/2022 */}
            {/* {
              `${recipeDone.date.dia}/${recipeDone.date.mes}/${recipeDone.date.ano}`
            } */}
          </p>
          <ShareBtn
            type="horizontal"
            index={ index }
            page={ recipeDone.type }
            id={ recipeDone.id }
          />
        </div>

      ))}
    </div>
  );
}

export default DoneRecipes;
