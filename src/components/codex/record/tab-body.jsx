import React from 'react';
import Facsimile from './facsimile';

function TabBody(props) {
	return (
		<div className="codex-record-body">
			{props.children}
      <Facsimile codexId={props.codex.pid} />
    </div>
	);
}

export default TabBody;
