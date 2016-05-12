import React from 'react';
import Input from 'hire-forms-input';

function PersonForm({ model, onChange }) {
	return (
		<ul>
			<li>
				<label>Name</label>
				<Input
					onChange={onChange.bind(this, "name")}
					value={model.name}
				/>
			</li>
			<li>
				<label>Actvity date</label>
				<Input
					onChange={onChange.bind(this, "activityDate")}
					value={model.activityDate}
				/>
			</li>
			<li>
				<label>Birthdate</label>
				<Input
					onChange={onChange.bind(this, "birthDate")}
					value={model.birthDate}
				/>
			</li>
			<li>
				<label>Deathdate</label>
				<Input
					onChange={onChange.bind(this, "deathDate")}
					value={model.deathDate}
				/>
			</li>
		</ul>
	);
}

export default PersonForm;
