import React, { useState, useContext } from 'react';
// import { Player } from '@lottiefiles/react-lottie-player';
import PropTypes from 'prop-types';
import RecipesContext from '../context/recipesContext';
import '../App.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(RecipesContext);

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
      return false;
    // } else if (target.name === 'password') {
    //   setPassword(target.value);
    }
    setPassword(target.value);
  };
  function btnValidation() {
    const emailValidator = /\S+@\S+\.\S+/;
    const SIX = 6;
    let buttonOn = true;
    if (password.length > SIX && emailValidator.test(email)) {
      buttonOn = false;
    }

    return buttonOn;
  }

  function saveUserEmail() {
    const userInfo = { email };
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUser(userInfo);
    history.push('/foods');
  }

  return (
    <div className="main-container-login">
      <form className="main-form-login">
        <div className="container-lottie-login">
          {/*  <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/packages/lf20_jsktriub.json"
            className="lottie-figure-login"
          /> */}
        </div>
        <h2 className="main-title-login">RecipesApp</h2>
        <label className="label-login" htmlFor="email">
          <input
            className="input-login"
            placeholder="email"
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label className="label-login" htmlFor="password">
          <input
            className="input-login"
            placeholder="Enter password"
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="button-login"
          data-testid="login-submit-btn"
          type="button"
          disabled={ btnValidation() }
          onClick={ saveUserEmail }
        >
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
