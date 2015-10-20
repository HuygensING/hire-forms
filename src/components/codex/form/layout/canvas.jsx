import React from "react";

const canvasWidth = 600;
const canvasHeight = 600;
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;
const radius = 180;
const degreeRadius = 180/5;

class LayoutCanvas extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			unit: 1
		};
	}

	componentDidMount() {
		this.initCoordinateSystem();
		this.initUnitCircle();
	}

	drawUnitCircle() {
		let delta = Date.now() - this.start;

		let rad = delta * Math.PI/-10000;

		if (rad < -2 * Math.PI) {
			this.start = Date.now();
		}

		this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Unit arc
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius, 0, rad, true);
		this.ctx.strokeStyle = "red";
		this.ctx.stroke();

		// Degree arc
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius/5, 0, rad, true);
		this.ctx.strokeStyle = "orange";
		this.ctx.stroke();

		this.ctx.beginPath();
		let unitX = Math.cos(rad) * radius;
		let unitY = Math.sin(rad) * -radius;
		let degreeX = Math.cos(rad) * degreeRadius;
		let degreeY = Math.sin(rad) * -degreeRadius;
		this.ctx.moveTo(centerX, centerY);
		this.ctx.fillStyle = "orange";
		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "alphabetic";
		this.ctx.fillText("π * " + (-rad/Math.PI).toFixed(2) + " (" + ((180/Math.PI) * -rad).toFixed() + "°)", centerX + degreeX, centerY - degreeY);
		this.ctx.lineTo(centerX + unitX, centerY - unitY);
		this.ctx.stroke();

		// Y-position
		this.ctx.fillStyle = "#BBB";
		this.ctx.textAlign = (unitX < 0) ? "start" : "end";
		this.ctx.textBaseline = "middle";
		this.ctx.lineTo(centerX, centerY - unitY);
		this.ctx.fillText((this.state.unit * Math.sin(rad)).toFixed(3) + "...", centerX, centerY - unitY);

		// X-position
		this.ctx.moveTo(centerX + unitX, centerY - unitY);
		this.ctx.lineTo(centerX + unitX, centerY);
		this.ctx.textBaseline = (unitY > 0) ? "top" : "bottom";
		this.ctx.textAlign = "center";
		this.ctx.fillText((this.state.unit * Math.cos(rad)).toFixed(3) + "...", centerX + unitX, centerY);
		this.ctx.strokeStyle = "#BBB";
		this.ctx.stroke();



		window.requestAnimationFrame(this.drawUnitCircle.bind(this));
	}

	initUnitCircle() {
		this.start = Date.now();

		let unitCircle = this.refs.unitCircle.getDOMNode();
		this.ctx = unitCircle.getContext('2d');

		unitCircle.width = canvasWidth;
		unitCircle.height = canvasHeight;

		this.drawUnitCircle();
	}

	initCoordinateSystem() {
		let coordinateSystem = this.refs.coordinateSystem.getDOMNode();
		let ctx = coordinateSystem.getContext('2d');

		coordinateSystem.width = canvasWidth;
		coordinateSystem.height = canvasHeight;

		ctx.beginPath();

		// Axes
		ctx.moveTo(0, centerY);
		ctx.lineTo(canvasWidth, centerY);
		ctx.moveTo(centerX, 0);
		ctx.lineTo(centerX, canvasHeight);

		// Axes - (1,0) dash
		ctx.moveTo(centerX + radius, centerY - 10);
		ctx.lineTo(centerX + radius, centerY + 10);

		// Axes - (0,1) dash
		ctx.moveTo(centerX - 10, centerY - radius);
		ctx.lineTo(centerX + 10, centerY - radius);

		// Axes - (-1,0) dash
		ctx.moveTo(centerX - radius, centerY - 10);
		ctx.lineTo(centerX - radius, centerY + 10);

		// Axes - (0,-1) dash
		ctx.moveTo(centerX - 10, centerY + radius);
		ctx.lineTo(centerX + 10, centerY + radius);

		// Axes values
		ctx.font = "16px serif";
		ctx.fillStyle = "rgb(20,220,220)";

		// (1, 0)
		ctx.textBaseline = "top"
		ctx.fillText(` ${this.state.unit}`, centerX + radius, centerY);
		// (0, 1)
		ctx.textBaseline = "bottom"
		ctx.textAlign = "end"
		ctx.fillText(`${this.state.unit} `, centerX, centerY - radius);
		// (-1, 0)
		ctx.textBaseline = "top"
		ctx.fillText(`-${this.state.unit} `, centerX - radius, centerY);
		// (0, -1)
		ctx.fillText(`-${this.state.unit} `, centerX, centerY + radius);

		ctx.strokeStyle = "rgb(20,220,220)";
		ctx.stroke();
	}

	render() {
		return (
			<div onClick={() => this.setState({unit: this.state.unit++})}>
				<canvas ref="unitCircle" />
				<canvas ref="coordinateSystem" />
			</div>
		);
	}
}

LayoutCanvas.PropTypes = {
	// verticalLayout:
};

export default LayoutCanvas;


// drawLayout() {
// 	let canvas = this.refs.canvas.getDOMNode();
// 	let ctx = canvas.getContext('2d');

// 	let totalWidth = this.props.horizontalLayout.reduce((p, c) => p + c);
// 	let totalHeight = this.props.verticalLayout.reduce((p, c) => p + c);

// 	let aspectRatio = calcAspectRatio(totalWidth, totalHeight, 150, 150);

// 	let canvasWidth = totalWidth * aspectRatio;
// 	let canvasHeight = totalHeight * aspectRatio;

// 	canvas.width = canvasWidth;
// 	canvas.height = canvasHeight;

// 	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

// 	ctx.fillStyle = "rgb(200,200,200)";
// 	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// 	// Draw horizontal areas
// 	let filled = false;
// 	let left = 0;
// 	this.props.horizontalLayout.map((columnWidth) => {
// 		if (filled) {
// 			ctx.fillStyle = "rgb(120,120,120)";
// 			ctx.fillRect(left*aspectRatio, 0, columnWidth*aspectRatio, canvasHeight);
// 		}

// 		filled = !filled;
// 		left += columnWidth;
// 	});

// 	// Draw vertical areas
// 	let empty = true;
// 	let top = 0;
// 	this.props.verticalLayout.map((rowHeight) => {
// 		if (empty) {
// 			ctx.fillStyle = "rgb(200,200,200)";
// 			ctx.fillRect(0, top*aspectRatio, canvasWidth, rowHeight*aspectRatio);
// 		}

// 		empty = !empty;
// 		top += rowHeight;
// 	});
// }