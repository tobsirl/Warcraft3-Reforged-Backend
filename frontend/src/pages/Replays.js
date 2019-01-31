import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Replays.css';

class Replays extends Component {
  state = {
    creating: false,
    replays: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.team1ElRef = React.createRef();
    this.team2ElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.mapElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchReplays();
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
    const date = this.dateElRef.current.value;
    const map = this.mapElRef.current.value;

    if (
      title.trim().length === 0 ||
      team1.trim().length === 0 ||
      team2.trim().length === 0 ||
      date.trim().length === 0 ||
      map.trim().length === 0
    ) {
      return;
    }

    const replay = { title, team1, team2, date, map };
    console.log(replay);

    const requestBody = {
      query: `
          mutation {
            createReplay(replayInput: {title: "${title}", team1: "${team1}", team2: "${team2}", date: "${date}", map: "${map}" }) {
              _id
              title
              team1
              team2
              date
              map
              submitter {
                email
              }
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.fetchReplays();
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchReplays = () => {
    const requestBody = {
      query: `
          query {
            replays {
              _id
              title
              team1
              team2
              date
              map
              submitter {
                _id
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
        const replays = resData.data.replays;
        this.setState({ replays: replays });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const replayList = this.state.replays.map(replay => {
      return (
        <li key={replay._id} className="replays__list-item">
          {replay.title}
        </li>
      );
    });
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
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="map">Map</label>
                <input type="text" id="map" ref={this.mapElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
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
        )}

        <ul className="replays__list">{replayList}</ul>
      </React.Fragment>
    );
  }
}

export default Replays;
