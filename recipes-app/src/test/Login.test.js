import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../components/Login';
import {
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from './constants';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const submmitBtn = 'login-submit-btn';

describe('Testa a página de Login', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
  test('testa se há os data-testids dos input e botão', () => {
    const { history } = renderWithRouter(<Login />);
    history.push('login');

    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const submitBtn = screen.getByTestId(submmitBtn);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('testa se o botão ficara habilitado', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const submitBtn = screen.getByTestId(submmitBtn);
    expect(submitBtn).toBeDisabled();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(submitBtn).not.toBeDisabled();
  });

  test('testa se renderiza a tela foods após salvar o usuario', () => {
    const { history } = renderWithRouter(<App />);
    // renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const submitBtn = screen.getByTestId(submmitBtn);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(submitBtn);

    expect(submitBtn).not.toBeDisabled();
    const { location: { pathname } } = history;

    expect(pathname).toBe('/foods');
  });

  test('testa se o button permanece desabilitado', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const submitBtn = screen.getByTestId(submmitBtn);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);

    expect(submitBtn).toBeDisabled();
  });

  // test('Email fica salvo no LocalStorage', () => {
  //   renderWithRouter(<Login />);
  //   expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  // });
});
