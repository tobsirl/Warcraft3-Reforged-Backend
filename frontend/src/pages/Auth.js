import React, { Component } from 'react';
import styled from 'styled-components';

const AuthForm = styled.div`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;

  label {
    width: 100%;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  }

  button {
    background-color: #3e66be;
    font: inherit;
    border: 3px solid #ffe600;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    margin-right: 1rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.26);
    color: #fff;
    cursor: pointer;
    transition: 0.5 ease;
  }

  button:hover,
  button:active {
    background: #ffe600;
    border-color: #3e66be;
    color: black;
  }
`;

class Auth extends Component {
  render() {
    return (
      <div>
        <AuthForm className="auth-form">
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div>
            <button type="button">Switch to Sign Up</button>
            <button type="submit">Submit</button>
          </div>
        </AuthForm>
      </div>
    );
  }
}

export default Auth;
