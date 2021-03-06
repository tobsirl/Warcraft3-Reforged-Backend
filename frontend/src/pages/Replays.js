import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import ReplayList from '../components/ReplayList/ReplayList';
import AuthContext from '../context/auth-context';
import './Replays.css';

import Spinner from '../components/Spinner/Spinner';

class Replays extends Component {
  state = {
    creating: false,
    replays: [],
    isLoading: false,
    selectedReplay: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.team1ElRef = React.createRef();
    this.team2ElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.mapElRef = React.createRef();
    this.fileElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchReplays();
  }

  startCreateReplayHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedReplay: null });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const team1 = this.team1ElRef.current.value;
    const team2 = this.team2ElRef.current.value;
    const date = this.dateElRef.current.value;
    const map = this.mapElRef.current.value;
    const file = this.fileElRef.current.value;

    if (
      title.trim().length === 0 ||
      team1.trim().length === 0 ||
      team2.trim().length === 0 ||
      date.trim().length === 0 ||
      map.trim().length === 0
    ) {
      return;
    }

    const replay = { title, team1, team2, date, map, file };
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
        this.setState(prevState => {
          const updatedReplays = [...prevState.replays];
          updatedReplays.push({
            _id: resData.data.createReplay._id,
            title: resData.data.createReplay.title,
            team1: resData.data.createReplay.team1,
            team2: resData.data.createReplay.team2,
            date: resData.data.createReplay.date,
            map: resData.data.createReplay.map,
            submitter: {
              _id: this.context.userId
            }
          });
          return { replays: updatedReplays };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchReplays = () => {
    this.setState({ isLoading: true });
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
        this.setState({ replays: replays, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  showDetailHanlder = replayId => {
    this.setState(prevState => {
      const selectedReplay = prevState.replays.find(e => e._id === replayId);
      return { selectedReplay: selectedReplay };
    });
  };

  // file upload
  fileSelectHandler = event => {
    this.setState({
      selectedReplay: event.target.files[0]
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
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="map">Map</label>
                <input type="text" id="map" ref={this.mapElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="file" onChange={this.fileSelectHandler}>
                  Chose file
                </label>
                <input type="file" id="file" ref={this.fileElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedReplay && (
          <Modal
            title={this.state.selectedReplay.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <h1>{this.state.selectedReplay.title}</h1>
            <h2>{this.state.selectedReplay.team1}</h2>
            <h2>{this.state.selectedReplay.team2}</h2>
            <h3>
              {new Date(this.state.selectedReplay.date).toLocaleDateString()}
            </h3>
            <p>{this.state.selectedReplay.map}</p>
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
              Create Replay
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ReplayList
            replays={this.state.replays}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHanlder}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Replays;
