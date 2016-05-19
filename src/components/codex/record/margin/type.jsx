import React, { PropTypes } from 'react';
import Text from '../elements/text';

const Type = (props) =>
	<div className={props.className}>
		<Text label="Type">{props.data.type}</Text>
		<Text label="Quantification">{props.data.quantification}</Text>
		<Text label="Remarks">{props.data.remarks}</Text>
	</div>;

Type.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object,
};

export default Type;
