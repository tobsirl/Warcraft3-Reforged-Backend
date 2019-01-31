import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Replays.css';

class Replays extends Component {
  state = {
    creating: false
  };

  constructor(props) {
    super(props);
    this.titleElRef = React.createElement();
    this.team1ElRef = React.createElement();
    this.team2ElRef = React.createElement();
    this.releaseDateElRef = React.createElement();
    this.mapElRef = React.createElement();
  }

  startCreateReplayHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Replay"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form action="">
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="team1">team1</label>
                <input type="text" id="team1" ref={this.team1ElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="team2">team2</label>
                <input type="text" id="team2" ref={this.team2ElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="releaseDate">Release Date</label>
                <input
                  type="date"
                  id="releaseDate"
                  ref={this.releaseDateElRef}
                />
              </div>
              <div className="form-control">
                <label htmlFor="map">Map</label>
                <input type="text" id="map" ref={mapElRef} />
              </div>
            </form>
          </Modal>
        )}
        <div className="replays-control">
          <p>Share your own replays!</p>
          <button
            type="button"
            className="btn"
            onClick={this.startCreateReplayHandler}
          >
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Replays;
