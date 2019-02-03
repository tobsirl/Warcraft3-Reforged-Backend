import React from 'react';
import PropTypes from 'prop-types';

import './ReplayItem.css';

const ReplayItem = (props) => (
  <div>
    <li key={replayId} className="replays__list-item">
      <div>
        <h1>{props.title}</h1>
        <h2>{props.team1}</h2>
        <h2>{props.team2}</h2>
      </div>
      <div>
        {props.userId === props.submitterId ? (
          <p>You're the owner of this replay.</p>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={props.onDetail.bind(this, props.replayId)}
          >
            View Details
          </button>
        )}
      </div>
    </li>
  </div>
);

ReplayItem.propTypes = {
  replayId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  submitterId: PropTypes.string.isRequired
};

export default ReplayItem;
