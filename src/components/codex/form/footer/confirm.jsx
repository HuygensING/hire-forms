import React, {PropTypes} from 'react';

const MODAL_WIDTH = 400;
const MODAL_PADDING = 32;

const modalStyle = (height=300) => {
  return {
    backgroundColor: "#FFF",
    borderRadius: "3px",
    boxShadow: "3px 3px 3px #555",
    boxSizing: "border-box",
    left: "50%",
    margin: `-${height/2}px 0 0 -${MODAL_WIDTH/2}px`,
    padding: MODAL_PADDING,
    position: "absolute",
    top: "50%",
    width: MODAL_WIDTH
  }
}

const cancelButtonStyle = {
  background: "none",
  border: "none",
  color: "#666",
  cursor: "pointer"
}
const confirmButtonStyle = {
  backgroundColor: "rgba(255, 0, 0, 0.1)",
  borderRadius: "3px",
  border: "1px solid darkred",
  color: "darkred",
  cursor: "pointer",
  outline: "none",
  padding: "4px 12px",
}

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {modalStyle: modalStyle()}
  }

  componentDidMount() {
    const div = React.findDOMNode(this);

    const height = div.getBoundingClientRect().height;
    this.setState({
      modalStyle: modalStyle(height)
    });
  }

  abort() {
    if (this.props.onAbort != null) {
      this.props.onAbort();
    }

    this.props.cleanup();
  }

  confirm() {
    this.props.onConfirm();
    this.props.cleanup();
  }

  render() {
    return (
      <div className="confirm-modal" style={this.state.modalStyle}>
        <div
          className="body"
          dangerouslySetInnerHTML={{__html: this.props.html}}
          style={{paddingBottom: MODAL_PADDING}}>
        </div>
        <footer style={{
            textAlign: "right"
          }}>
          <button
            onClick={this.abort.bind(this)}
            style={{...cancelButtonStyle, ...{
              marginRight: "10px"
            }}}>
            Cancel
          </button>
          <button
            onClick={this.confirm.bind(this)}
            style={{...confirmButtonStyle, ...{
            }}}>
            Confirm
          </button>
        </footer>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  cleanup: PropTypes.func,
  html: PropTypes.string.isRequired,
  onAbort: PropTypes.func,
  onConfirm: PropTypes.func.isRequired
};

export default (props) => {
  const cleanup = (ev) => {
    if (ev == null || ev.target.matches("div.confirm-modal-container")) {
      container.removeEventListener("click", cleanup);
      React.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }
  }

  const container = document.createElement("div");
  container.className = "confirm-modal-container";
  container.style = `
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    bottom: 0;
    right: 0;
    left: 0
  `;
  container.addEventListener("click", cleanup);
  document.body.appendChild(container);

  React.render(<ConfirmModal {...props} cleanup={cleanup}/>, container);
};
