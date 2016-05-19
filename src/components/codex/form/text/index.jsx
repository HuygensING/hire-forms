import React, { PropTypes } from 'react';
import TextUnit from './unit';
import Unit from 'formElements/unit';

const Text = (props) =>
	<Unit
		{ ...props }
		component={TextUnit}
		label="Text"
		propName="textUnits"
		type="text"
	/>;

Text.propTypes = {
	codex: PropTypes.object,
};

export default Text;
