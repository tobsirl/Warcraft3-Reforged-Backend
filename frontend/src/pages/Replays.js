import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import './Replays.css';

class Replays extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal title="Add Replay" canCancel canConfirm>
          <p>Modal Content</p>
        </Modal>
        <div className="replays-control">
          <p>Share your own replays!</p>
          <button type="button" className="btn">
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Replays;
