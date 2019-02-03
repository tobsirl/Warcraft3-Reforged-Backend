import React from 'react';

import ReplayItem from './ReplayItem/ReplayItem';
import './ReplayList.css';

const ReplayList = props => {
  const replays = props.replays.map(replay => (
    <ReplayItem
      key={replay._id}
      replayId={replay._id}
      title={replay.title}
      team1={replay.team1}
      team2={replay.team2}
      userId={props.authUserId}
      submitterId={replay.submitter._id}
      onDetail={props.onViewDetail}

    />
  ));

  return <ul className="replay__list">{replays}</ul>;
};

export default ReplayList;
