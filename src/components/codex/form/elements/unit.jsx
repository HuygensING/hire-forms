import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'hire-tabs';
// import MarginUnit from './unit';

class Unit extends React.Component {
	state = {
		tabIndex: 1,
	}

	addUnit() {
		const units = this.props.codex[this.props.propName];
		this.props.addUnit(this.props.type);
		this.setState({
			tabIndex: units.length + 1,
		});
	}

	removeUnit() {
		this.props.formDeleteKey([this.props.propName, this.state.tabIndex - 1]);
		this.setState({
			tabIndex: this.state.tabIndex - 1,
		});
	}

	render() {
		const units = this.props.codex[this.props.propName];

		return (
			<div className={this.props.type}>
				<Tabs
					activeTab={`${this.props.label} unit ${this.state.tabIndex}`}
					className="sub-menu"
					onChange={(name) => this.setState({ tabIndex: name.substr(name.lastIndexOf(' ') + 1) })}
				>
					{units.map((unit, i) =>
						<Tab
							key={i}
							label={`${this.props.label} unit ${i + 1}`}
						>
								<this.props.component
									{...this.props}
									attr={[this.props.propName, i]}
									formData={unit}
									onChange={this.props.formChangeKey}
									onDelete={this.props.formDeleteKey}
									onInvalid={this.props.formInvalid}
								/>
								{this.props.children}
						</Tab>
					)}
				</Tabs>
				<button
					className="add-unit"
					onClick={this.addUnit.bind(this)}
				>
					Add {this.props.label} unit
				</button>
				<button
					className="remove-unit"
					onClick={this.removeUnit.bind(this)}
				>
					Remove {this.props.label} unit
				</button>
			</div>
		);
	}
}

Unit.propTypes = {
	addUnit: PropTypes.func,
	codex: PropTypes.object,
	formChangeKey: PropTypes.func,
	formDeleteKey: PropTypes.func,
	formInvalid: PropTypes.func,
	label: PropTypes.string,
	propName: PropTypes.string,
	type: PropTypes.string,
};

export default Unit;
