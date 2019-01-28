import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Form = styled.form `
  width: 40rem;
  max-width: 80%;
  margin: 5rem auto;

`

class Auth extends Component {
  render() {
    return (
      <div>
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
        </Form>
        <div className="form-actions">
          <button type="button">Switch to Sign Up</button>
          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }
}

export default Auth;
