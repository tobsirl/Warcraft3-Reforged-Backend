import React from 'react';

import ReplayItem from './ReplayItem/ReplayItem';
import './ReplayList.css';

const ReplayList = props => {
  const replays = props.replays.map(replay => (
    <ReplayItem key={replay._id} replayId={replay._id} title={replay.title} />
  ));

  return (
    <ul className="replay__list">
      {replays}
    </ul>
);
};

export default ReplayList;
