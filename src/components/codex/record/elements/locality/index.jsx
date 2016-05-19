import React from 'react';

const Locality = ({ data }) =>
	<ul className="locality">
		<li className="locality">
			<label>Region - Place - Scriptorium</label>
			<ul>
				<li>{data.locality.region}</li>
				<li>{data.locality.place}</li>
				{
					data.locality.scriptorium !== '(empty)' ?
						<li>{data.locality.scriptorium}</li> :
						null
				}
				{data.certain ? null : <small title="uncertain"> ?</small>}
			</ul>
		</li>
		{data.remarks !== '' ?
			<li className="remarks">
				<label></label>
				<span>{data.remarks}</span>
			</li> :
			null
		}
	</ul>;

Locality.propTypes = {
	data: React.PropTypes.object.isRequired,
};

export default Locality;
