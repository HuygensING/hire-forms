import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import SelectList from "../../components/select-list";

import persons from "../../stores/persons";
import personsActions from "../../actions/persons";

import {FORM} from "../../constants";

class PersonForm extends Form {
	componentDidMount() {
		personsActions.getAllPersons();

		persons.listen(this.handleStoreChange);
	}

	componentWillUnmount() {
		persons.stopListening(this.handleStoreChange);
	}

	constructor(props) {
		super(props);

		this.state = {persons: persons.getState()};
	}

	handleStoreChange() {
		this.setState({persons: persons.getState()});
	}

	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>Person</label>
					<SelectList
						onChange={this.handleChange.bind(this, "person")}
						options={this.state.persons.get("all").toArray()}
						values={model.get("person").toArray()} />
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.handleChange.bind(this, "certain")}
						value={model.get("certain")} />
				</li>
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.handleChange.bind(this, "pages")}
						value={model.get("pages")} />
				</li>
				<li>
					<label>Remarks</label>
					<Input
						onChange={this.handleChange.bind(this, "remarks")}
						value={model.get("remarks")} />
				</li>
			</ul>
		);
	}
}

PersonForm.defaultFormProps = {
	certain: false,
	pages: "",
	person: new Immutable.List(),
	remarks: ""
};

PersonForm.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default PersonForm;