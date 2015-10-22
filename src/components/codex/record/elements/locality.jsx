import React from "react";

class Locality extends React.Component {
	render() {
		return (
			<ul className="locality">
				<li>
					<label>Locality</label>
					<ul>
						<li>{this.props.data.locality.region}</li>
						<li>{this.props.data.locality.place}</li>
						<li>{this.props.data.locality.scriptorium}</li>
						<li>{this.props.data.certain ? "" : "?"}</li>
					</ul>
				</li>
				<li>
					<label>Remarks</label>
					<span>{this.props.data.remarks}</span>
				</li>
			</ul>
		);
	}
}

Locality.propTypes = {
	data: React.PropTypes.object.isRequired
}

export default Locality;