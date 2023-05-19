import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareBtn({ type, index, id, page }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const mainTitle = pathname.split('/')[1];
  const recipyID = pathname.split('/')[2];
  const [copied, setCopied] = useState(false);
  const [testId, setTestId] = useState('');
  // const NEG_ONE = -1;
  // const fixedTitle = mainTitle.slice(0, NEG_ONE);

  const handleShare = () => {
    if (mainTitle === 'foods' || mainTitle === 'drinks') {
      copy(`http://localhost:3000/${mainTitle}/${recipyID}`);
      setCopied(true);
    } else {
      copy(`http://localhost:3000/${page}s/${id}`);
      setCopied(true);
    }
  };

  const defineTestId = () => {
    if (type === 'horizontal') {
      setTestId(`${index}-horizontal-share-btn`);
    } else {
      setTestId('share-btn');
    }
  };

  useEffect(() => {
    defineTestId();
  });

  return (
    <>
      { copied && (<p>Link copied!</p>)}
      <button onClick={ handleShare } type="button">
        Share
        <img
          width={ 100 }
          height={ 100 }
          data-testid={ testId }
          src={ shareIcon }
          alt="icone share btn"
        />
      </button>
    </>
  );
}

ShareBtn.defaultProps = {
  index: 0,
};

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareBtn;
