import React from 'react';
import Textarea from 'hire-forms-textarea';

const LiTextarea = (props) =>
	<li className="well li-textarea">
		<label>{props.label}</label>
		<div>
			<Textarea
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	</li>;

LiTextarea.defaultProps = {
	value: '',
};

LiTextarea.propTypes = {
	label: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.string,
};

export default LiTextarea;
