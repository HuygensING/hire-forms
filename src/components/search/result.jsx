import React from "react";
import {Link} from "react-router";

import {facsimileUrl} from "../../config";

class Result extends React.Component {
	componentDidMount() {
		let model = this.props.data;
		let id = model["^codex"].substr(model["^codex"].lastIndexOf("/") + 1);
		let url = `${facsimileUrl}thumbnail_${id}.jpg`;

		let img = this.refs.facsimile;

		let onError = () => {
			img.src = "/images/placeholder.svg"
			img.removeEventListener("error", onError);
		};

		img.addEventListener("error", onError);
		img.src = url;
	}

	toLabel(name) {
		return (this.props.labels.hasOwnProperty(name)) ?
			this.props.labels[name] :
			name;
	}

	render() {
		let model = this.props.data;
		let id = model["^codex"].substr(model["^codex"].lastIndexOf("/") + 1);

		return (
			<li>
				<Link to={`/codex/${id}`}>
					<div className="img-container">
						<img ref="facsimile" />
					</div>
					<div className="data">
						<label>{model.name}</label>
						<ul className="metadata">
							<li>
								<label>Date & location</label>
								<span>{model.date + " " + model.localization}</span>
							</li>
							<li>
								<label>Content</label>
								<span>{model.contentSummary}</span>
							</li>
							<li>
								<label>Marginalia</label>
								<span>{model.marginalsSummary}</span>
							</li>
						</ul>
					</div>
				</Link>
			</li>
		);
	}
}

Result.defaultProps = {
};

Result.propTypes = {
	data: React.PropTypes.object,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	onSelect: React.PropTypes.func.isRequired
};

export default Result;
