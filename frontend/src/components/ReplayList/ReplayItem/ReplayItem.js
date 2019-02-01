import React from 'react';
import PropTypes from 'prop-types';

import './ReplayItem.css';

const ReplayItem = ({ replayId, title }) => (
  <div>
    <li key={replayId} className="replays__list-item">
      <div>
        <h1>{title}</h1>
        <h2>Team1</h2>
        <h2>Team2</h2>
      </div>
      <div>
        <button type="button">View Details</button>
      </div>
    </li>
  </div>
);

ReplayItem.propTypes = {
  replayId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ReplayItem;
