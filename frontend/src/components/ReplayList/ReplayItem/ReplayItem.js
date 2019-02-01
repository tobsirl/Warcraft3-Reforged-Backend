import React from 'react';
import PropTypes from 'prop-types';

import './ReplayItem.css';

const ReplayItem = ({ replayId, title, team1, team2 }) => (
  <div>
    <li key={replayId} className="replays__list-item">
      <div>
        <h1>{title}</h1>
        <h2>{team1}</h2>
        <h2>{team2}</h2>
      </div>
      <div>
        <button type="button" className="btn">
          View Details
        </button>
        <p>You're the owner of this replay.</p>
      </div>
    </li>
  </div>
);

ReplayItem.propTypes = {
  replayId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired
};

export default ReplayItem;
