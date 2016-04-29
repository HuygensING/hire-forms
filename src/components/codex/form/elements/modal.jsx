import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
const MODAL_PADDING = 32;

const modalStyle = (width, height = 300) => (
	{
		backgroundColor: '#FFF',
		borderRadius: '3px',
		boxShadow: '3px 3px 3px #555',
		boxSizing: 'border-box',
		left: '50%',
		margin: 0,
		marginTop: `-${height / 2}px`,
		marginLeft: `-${width / 2}px`,
		overflowY: 'auto',
		padding: MODAL_PADDING,
		position: 'absolute',
		top: '50%',
		width,
	}
);

const cancelButtonStyle = {
	background: 'none',
	border: 'none',
	color: '#666',
	cursor: 'pointer',
};

const confirmButtonStyle = {
	backgroundColor: 'rgba(255, 0, 0, 0.1)',
	borderRadius: '3px',
	border: '1px solid darkred',
	color: 'darkred',
	cursor: 'pointer',
	outline: 'none',
	padding: '4px 12px',
};

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = { modalStyle: modalStyle(this.props.width) };
	}

	componentDidMount() {
		const height = this.refs.div.getBoundingClientRect().height;
		const style = modalStyle(this.props.width, height);

		if (height > document.documentElement.clientHeight) {
			style.height = document.documentElement.clientHeight;
			style.top = 0;
			delete style.marginTop;
		}
		this.setState({
			modalStyle: style,
		});
	}

	abort() {
		if (this.props.onAbort != null) {
			this.props.onAbort();
		}

		this.props.cleanup();
	}

	confirm() {
		if (this.props.onConfirm != null) this.props.onConfirm();
		this.props.cleanup();
	}

	render() {
		const cancelButton = (this.props.cancelLabel != null) ?
			<button
				onClick={this.abort.bind(this)}
				style={{ ...cancelButtonStyle, ...{
					marginRight: '10px',
				} }}
			>
				{this.props.cancelLabel}
			</button> :
			null;

		return (
			<div className="confirm-modal" ref="div" style={this.state.modalStyle}>
				<div
					className="body"
					style={{ paddingBottom: MODAL_PADDING }}
				>
					{this.props.html}
				</div>
				<footer style={{ textAlign: 'right' }}>
					{cancelButton}
					<button
						onClick={this.confirm.bind(this)}
						style={{ ...confirmButtonStyle, ...{
						} }}
					>
						{this.props.confirmLabel}
					</button>
				</footer>
			</div>
		);
	}
}

Modal.propTypes = {
	cleanup: PropTypes.func,
	cancelLabel: PropTypes.string,
	confirmLabel: PropTypes.string,
	html: PropTypes.object.isRequired,
	onAbort: PropTypes.func,
	onConfirm: PropTypes.func,
	width: PropTypes.number,
};

Modal.defaultProps = {
	cancelLabel: 'Cancel',
	confirmLabel: 'Confirm',
	width: 400,
};

export default (props) => {
	const container = document.createElement('div');
	container.className = 'confirm-modal-container';
	container.style = `
		position: fixed;
		top: 0;
		background: rgba(0, 0, 0, 0.6);
		bottom: 0;
		right: 0;
		left: 0
	`;

	const cleanup = (ev) => {
		if (ev == null || ev.target.matches('div.confirm-modal-container')) {
			container.removeEventListener('click', cleanup);
			ReactDOM.unmountComponentAtNode(container);
			document.body.removeChild(container);
		}
	};

	container.addEventListener('click', cleanup);
	document.body.appendChild(container);

	ReactDOM.render(<Modal {...props} cleanup={cleanup} />, container);
};
