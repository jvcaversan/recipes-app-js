import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [toRedirect, setRedirect] = useState(false);
  const [searchBar, setSearch] = useState(false);

  function toggleSearch() {
    if (searchBar === false) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }

  return (
    <header>
      <div>
        <button
          onClick={ () => setRedirect(true) }
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Botao de Profile"
          />
        </button>
        { toRedirect && <Redirect to="/profile" /> }
        <h1 data-testid="page-title">
          { title }
        </h1>
        { (title === 'Foods' || title === 'Drinks')
        && (
          <button onClick={ () => toggleSearch() } type="button">
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Botao de Busca"
            />
          </button>)}
        { searchBar && <SearchBar />}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
