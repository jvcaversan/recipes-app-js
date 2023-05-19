import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  const userEmail = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : [];
  // console.log('userEmail ===', userEmail);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    // const saveUserEmail = JSON.parse(localStorage.getItem('user'));
    // setUser(saveUserEmail);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <h2
          data-testid="profile-email"
        >
          { userEmail.email ? userEmail.email : '' }
        </h2>
      </div>
      <nav>
        <button
          type="button"
          data-testid="profile-done-btn"
          disabled={ false }
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          disabled={ false }
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          disabled={ false }
          onClick={ handleLogout }
        >
          Logout
        </button>
      </nav>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Profile;
