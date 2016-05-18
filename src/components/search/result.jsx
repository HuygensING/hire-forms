import React from 'react';
import { Link } from 'react-router';
import { facsimileUrl } from '../../config';

class Result extends React.Component {
	componentDidMount() {
		const model = this.props.data;
		const id = model['^codex'].substr(model['^codex'].lastIndexOf('/') + 1);
		const url = `${facsimileUrl}thumbnail_${id}.jpg`;

		const img = this.refs.facsimile;

		const onError = () => {
			img.src = '/images/placeholder.svg';
			img.removeEventListener('error', onError);
		};

		img.addEventListener('error', onError);
		img.src = url;
	}

	toLabel(name) {
		return (this.props.labels.hasOwnProperty(name)) ?
			this.props.labels[name] :
			name;
	}

	render() {
		const model = this.props.data;
		const id = model['^codex'].substr(model['^codex'].lastIndexOf('/') + 1);

		return (
			<li>
				<Link to={`/codex/${id}`}>
					<div className="img-container">
						<img alt="Facsimile" ref="facsimile" />
					</div>
					<div className="data">
						<label>{model.name}</label>
						<ul className="metadata">
							<li>
								<label>Date & location</label>
								<span>{`${model.date} ${model.localization}`}</span>
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
	onSelect: React.PropTypes.func,
};

export default Result;
