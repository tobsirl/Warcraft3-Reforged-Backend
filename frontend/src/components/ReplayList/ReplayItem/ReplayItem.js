import React from 'react';

import './ReplayItem.css';

const ReplayItem = props => (
  <div>
    <li key={props.replayId} className="replays__list-item">
      {props.title}
    </li>
  </div>
);

export default ReplayItem;
