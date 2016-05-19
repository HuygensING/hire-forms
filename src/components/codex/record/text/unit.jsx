import React, { PropTypes } from 'react';
import Text from '../elements/text';
import Well from 'src/components/well';

const flatten = (prev, curr) => prev.concat(curr);
const unique = (prev, curr) =>
	(prev.indexOf(curr) === -1) ? prev.concat(curr) : prev;

const TabBody = ({ codex, textUnit }) =>
	<Well>
		<div className="list">
			<label>Author</label>
			<ul>{
				codex.textUnits
					.map((tu) =>
						tu.text.authors.map((author) =>
							<li key={Math.random()}>{author.person.value}</li>
						)
					)
					.reduce(flatten, [])
					.reduce(unique, [])
			}</ul>
		</div>
		<Text label="Title">{textUnit.text.title}</Text>
		<Text label="Title in codex">{textUnit.titleInCodex}</Text>
		<Text label="Incipit">{textUnit.incipit}</Text>
		<Text label="Explicit">{textUnit.explicit}</Text>
		<Text label="State of preservation">{textUnit.stateOfPreservation}</Text>
		<Text label="Page range">{textUnit.pages}</Text>
		<Text label="Language">{textUnit.text.language}</Text>
		<Text label="Period">{textUnit.text.period}</Text>
		<Text label="Genre">{textUnit.text.contentTypes.join('; ')}</Text>
	</Well>;

TabBody.propTypes = {
	codex: PropTypes.object,
	textUnit: PropTypes.object,
};

export default TabBody;
