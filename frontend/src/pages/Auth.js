import React, { Component } from 'react';

class Auth extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
