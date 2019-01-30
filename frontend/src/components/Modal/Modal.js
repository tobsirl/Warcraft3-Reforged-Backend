import React from 'react';

import './Modal.css';

const modal = props => (
  <div className="modal">
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canCancel && (
        <button type="button" className="btn">
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button type="button" className="btn">
          Confirm
        </button>
      )}
    </section>
  </div>
);

export default modal;
