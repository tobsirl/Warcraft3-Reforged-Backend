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
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    console.log(email, password);
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: null,
      headers: {
        
      }
    })
  };

  render() {
    return (
      <div>
        <AuthForm className="auth-form" >
          <form onSubmit={this.submitHandler}>
            <div className="form-control">
              <label htmlFor="email">E-Mail</label>
              <input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button">Switch to Sign Up</button>
            </div>
          </form>
        </AuthForm>
      </div>
    );
  }
}

export default Auth;
