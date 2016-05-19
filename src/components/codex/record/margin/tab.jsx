import React, { PropTypes } from 'react';
import Well from '../../../well';
import Text from '../elements/text';
import Locality from '../elements/locality';
import Type from './type';

const TabBody = ({ marginUnit }) =>
	<div>
		<Well>
			<Text label="Date">{marginUnit.date}</Text>
			<Text label="Relative date">{marginUnit.relativeDate}</Text>
			{marginUnit.hasOwnProperty('origin') ?
				<Locality data={marginUnit.origin} /> :
				null
			}
			<Text label="Languages">{marginUnit.languages}</Text>
			<Text label="Script type">{marginUnit.scriptTypes.join(', ')}</Text>
			<Text label="Number of hands">{marginUnit.handCount}</Text>
			<div className="list">
				<label>Annotator</label>
				<ul>{
					marginUnit.annotators
						.map((annotator, i) =>
							<li key={i}>
								<span className="name">{annotator.person.value}</span>
								<br />
								<span className="remarks">{annotator.remarks}</span>
							</li>
						)
				}</ul>
			</div>
			<Text label="Remarks">{marginUnit.scriptRemarks}</Text>
		</Well>
		<Well title="Annotation types">
			{marginUnit.marginTypes.map((marginType, i) =>
				<Type
					className="annotation-type"
					data={marginType}
					key={i}
				/>
			)}
		</Well>
		<Well title="Annotation type remarks">
			{marginUnit.typologyRemarks}
		</Well>
		<Well title="Specific phenomena">
			{marginUnit.specificPhenomena.map((specificPhenomenon, i) =>
				<Type
					className="specific-phenomenon"
					data={specificPhenomenon}
					key={i}
				/>
			)}
		</Well>
		<Well title="General remarks on function and form">
			{marginUnit.generalObservations}
		</Well>
	</div>;

TabBody.propTypes = {
	index: PropTypes.number,
	marginUnit: PropTypes.object,
};

export default TabBody;
