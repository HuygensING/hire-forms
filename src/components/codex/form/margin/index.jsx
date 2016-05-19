import React, { PropTypes } from 'react';
import MarginUnit from './unit';
import Unit from 'formElements/unit';

const Margin = (props) =>
	<Unit
		{ ...props }
		component={MarginUnit}
		label="Margin"
		propName="marginUnits"
		type="margin"
	/>;

Margin.propTypes = {
	codex: PropTypes.object,
};

export default Margin;
