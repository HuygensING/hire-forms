import React, { PropTypes } from 'react';

const sum = (prev, curr) => prev + +curr;
const getAspectRatio = (originalWidth, originalHeight, boxSize) => {
	const widthRatio = boxSize / originalWidth;
	const heightRatio = boxSize / originalHeight;

	return Math.min(widthRatio, heightRatio);
};

export default class LayoutCanvas extends React.Component {
	componentDidMount() {
		this.draw(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.draw(nextProps);
	}

	draw(props) {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		const columns = props.horizontalLayout.split(/<|>/g);
		const blocks = props.verticalLayout.split(/<|>/g);
		const totalWidth = columns.reduce(sum, 0);
		const totalHeight = blocks.reduce(sum, 0);
		const aspectRatio = getAspectRatio(totalWidth, totalHeight, props.boxSize);
		const canvasWidth = totalWidth * aspectRatio;
		const canvasHeight = totalHeight * aspectRatio;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = 'rgb(200,200,200)';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		// Draw horizontal areas
		let left = 0;
		columns.forEach((columnWidth, index) => {
			if (index % 2 !== 0) {
				ctx.fillStyle = 'rgb(120,120,120)';
				ctx.fillRect(left * aspectRatio, 0, columnWidth * aspectRatio, canvasHeight);
			}
			left += +columnWidth;
		});

		// Draw vertical areas
		let top = 0;
		blocks.forEach((rowHeight, index) => {
			if (index % 2 === 0) {
				ctx.fillStyle = 'rgb(200,200,200)';
				ctx.fillRect(0, top * aspectRatio, canvasWidth, rowHeight * aspectRatio);
			}
			top += +rowHeight;
		});
	}

	render() {
		return (
			<canvas
				ref="canvas"
				title={`Vertical: ${this.props.verticalLayout}\nHorizontal: ${this.props.horizontalLayout}`}
			/>
		);
	}
}

LayoutCanvas.propTypes = {
	// Size of the bounding box, ie: max width/height of the canvas
	boxSize: PropTypes.number,
	horizontalLayout: PropTypes.string,
	verticalLayout: PropTypes.string,
};

LayoutCanvas.defaultProps = {
	boxSize: 80,
};
