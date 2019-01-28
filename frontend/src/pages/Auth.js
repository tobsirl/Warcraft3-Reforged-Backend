import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Form = styled.div`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
`;

const Label = styled.label`
  width: 100%;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  display: block;
`;

class Auth extends Component {
  render() {
    return (
      <div>
        <Form className="auth-form">
          <div className="form-control">
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" />
          </div>
          <div className="form-control">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
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
