import React from 'react';

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

export default ReplayItem;
