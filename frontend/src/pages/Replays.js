import React, { Component } from 'react';

import './Replays.css';

class Replays extends Component {
  render() {
    return (
      <div className="replays-control">
        <p>Share your own replays!</p>
        <button type="button" className="btn">
          Create Event
        </button>
      </div>
    );
  }
}

export default Replays;
