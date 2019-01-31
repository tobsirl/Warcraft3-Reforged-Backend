import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Replays.css';

class Replays extends Component {
  state = {
    creating: false
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.team1ElRef = React.createRef();
    this.team2ElRef = React.createRef();
    this.releaseDateElRef = React.createRef();
    this.mapElRef = React.createRef();
  }

  startCreateReplayHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const team1 = this.team1ElRef.current.value;
    const team2 = this.team2ElRef.current.value;
    const releaseDate = this.releaseDateElRef.current.value;
    const map = this.mapElRef.current.value;

    const event = { title, team1, team2, releaseDate, map };
    console.log(event);

    const requestBody = {
      query: `
          mutation {
            createReplay(replayInput: {title: "${title}", team1: "${team1}", team2: "${team2}", releaseDate: "${releaseDate}", map: "${map}" }) {
              _id
              title
              team1
              team2
              releaseData
              map
              submitter {
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
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
                  type="datetime-local"
                  id="releaseDate"
                  ref={this.releaseDateElRef}
                />
              </div>
              <div className="form-control">
                <label htmlFor="map">Map</label>
                <input type="text" id="map" ref={this.mapElRef} />
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
