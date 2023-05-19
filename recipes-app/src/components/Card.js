import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ index, imgurl, name, id, title, type }) {
  const history = useHistory();
  const [testIdType, setTestIdType] = useState('');
  const [cardName, setCardName] = useState('');

  const onClick = () => {
    history.push(`${title.toLowerCase()}/${id}`);
  };

  function checkType() {
    if (type === 'recipe') {
      setTestIdType('-recipe-card');
      setCardName('-card-name');
    }
    if (type === 'recomendation') {
      setTestIdType('-recomendation-card');
      setCardName('-recomendation-title');
    }
  }
  useEffect(() => {
    checkType();
  });

  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ `${index}${testIdType}` }
    >
      <img
        width={ 200 }
        data-testid={ `${index}-card-img` }
        alt={ name }
        src={ imgurl }
      />
      <h2 data-testid={ `${index}${cardName}` }>{ name }</h2>
    </button>
  );
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  imgurl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
