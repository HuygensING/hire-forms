import React, { PropTypes } from 'react';
import Facsimile from './facsimile';

const TabBody = (props) =>
	<div className="codex-record-body">
		{props.children}
    <Facsimile codexId={props.codex.pid} />
  </div>;

TabBody.propTypes = {
	codex: PropTypes.object,
	children: PropTypes.element,
};

export default TabBody;
