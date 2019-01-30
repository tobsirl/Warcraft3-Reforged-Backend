import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Replays.css';

class Replays extends Component {
  state = {
    creating: false
  }

  startCreateReplayHandler = () => {
    this.setState({creating: true})
  }

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && <Modal title="Add Replay" canCancel canConfirm>
          <p>Modal Content</p>
        </Modal>}
        <div className="replays-control">
          <p>Share your own replays!</p>
          <button type="button" className="btn" onClick={this.startCreateReplayHandler}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Replays;
