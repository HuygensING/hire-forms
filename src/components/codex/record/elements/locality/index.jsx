import React from "react";
import cx from "classnames";

class Locality extends React.Component {
	render() {
		return (
			<ul className="locality">
				<li className="locality">
					<label>Region - Place - Scriptorium</label>
					<ul>
						<li>{this.props.data.locality.region}</li>
						<li>{this.props.data.locality.place}</li>
						{this.props.data.locality.scriptorium !== "(empty)" ? <li>{this.props.data.locality.scriptorium}</li> : null}
						{this.props.data.certain ? null : <small title="uncertain"> ?</small>}
					</ul>
				</li>
				{this.props.data.remarks !== "" ?
					<li className="remarks">
						<label></label>
						<span>{this.props.data.remarks}</span>
					</li> :
					null
				}
			</ul>
		);
	}
}

Locality.propTypes = {
	data: React.PropTypes.object.isRequired
}

export default Locality;
