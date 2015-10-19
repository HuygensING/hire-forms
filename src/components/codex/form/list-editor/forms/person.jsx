import React from "react";
import Input from "hire-forms-input";

class PersonForm extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<label>Name</label>
					<Input
						onChange={this.props.onChange.bind(this, "name")}
						value={this.props.model.name} />
				</li>
				<li>
					<label>Actvity date</label>
					<Input
						onChange={this.props.onChange.bind(this, "activityDate")}
						value={this.props.model.activityDate} />
				</li>
				<li>
					<label>Birthdate</label>
					<Input
						onChange={this.props.onChange.bind(this, "birthDate")}
						value={this.props.model.birthDate} />
				</li>
				<li>
					<label>Deathdate</label>
					<Input
						onChange={this.props.onChange.bind(this, "deathDate")}
						value={this.props.model.deathDate} />
				</li>
			</ul>
		);
	}
}

export default PersonForm;