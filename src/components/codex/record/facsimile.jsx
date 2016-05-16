import React from 'react';
import { facsimileUrl } from '../../../config';

class Facsimile extends React.Component {
	componentDidUpdate() {
		if (this.props.codexId === '') return;
		const url = `${facsimileUrl}${this.props.codexId}.jpg`;

		const img = this.refs.facsimile;

		const onError = () => {
			img.src = '/images/placeholder.svg';
			img.removeEventListener('error', onError);
		};

		img.addEventListener('error', onError);
		img.src = url;
	}

	render() {
		return (
			<img alt="Facsimile" ref="facsimile" />
		);
	}
}

export default Facsimile;
