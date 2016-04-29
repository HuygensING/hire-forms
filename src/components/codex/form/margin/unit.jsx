import React from 'react';
import form from 'hire-forms-form';
import MultiForm from 'hire-forms-multi-form';

// FORM COMPONENTS
import Input from 'hire-forms-input';
import SelectList from 'hire-forms-select-list';
import MutableList from 'hire-forms-mutable-list';

// FORMS
import Person from 'formElements/person';
import Date from 'formElements/date';
import MarginType from './margin-type';
import SpecificPhenomena from './specific-phenomena';

import LiTextarea from 'formElements/li-textarea';

import { personModel, marginTypeModel, marginUnitModel, specificPhenomenaModel } from 'src/models';

class MarginUnit extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData);
	}

	render() {
		const model = { ...marginUnitModel, ...this.props.formData };

		return (
			<ul className="codex-form">
				<li className="well">
					<ul>
						<Date value={model.date} onChange={this.props.handleChange.bind(this, 'date')} />
						<li>
							<label>Relative date</label>
							<Input
								onChange={this.props.handleChange.bind(this, "relativeDate")}
								value={model.relativeDate}
							/>
						</li>
						<li>
							<label>Language</label>
							<SelectList
								onChange={this.props.handleChange.bind(this, "languages")}
								options={this.props.facetData.facet_s_margin_language}
								values={model.languages}
							/>
						</li>
					</ul>
				</li>
				<li className="well">
					<label>Annotators</label>
					<MultiForm
						addButtonValue="+"
						attr={"annotators"}
						component={Person}
						model={personModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						persons={this.props.persons}
						values={model.annotators}
					/>
				</li>
				{/*
				Scripts?
				Hands?
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.props.handleChange.bind(this, "identifier")}
						value={model.identifier} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.props.handleChange.bind(this, "pages")}
						value={model.pages} />
				</li>*/}
				<li className="well">
					<ul>
						<li>
							<label>Script types</label>
							<SelectList
								onChange={this.props.handleChange.bind(this, "scriptTypes")}
								options={this.props.facetData.facet_s_margin_script_type}
								values={model.scriptTypes} />
						</li>
						<li>
							<label>Number of hands</label>
							<Input
								onChange={this.props.handleChange.bind(this, "handCount")}
								value={model.handCount} />
						</li>
					</ul>
				</li>

				<LiTextarea
					label="Script remarks"
					onChange={this.props.handleChange.bind(this, "scriptsRemarks")}
					value={model.scriptsRemarks}
				/>

				<li className="well">
					<label>Annotation type</label>
					<MultiForm
						{...this.props}
						addButtonValue="+"
						attr={"marginTypes"}
						component={MarginType}
						model={marginTypeModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						values={model.marginTypes}
					/>
				</li>

				{/*<li>
					<label>Origin</label>
					<DateAndLocalityForm
						attr={"origin"}
						onChange={this.props.handleChange}
						onInvalid={this.props.handleInvalid}
						formData={model.origin} />
				</li>*/}
				<LiTextarea
					label="Annotation type remarks"
					onChange={this.props.handleChange.bind(this, "typologyRemarks")}
					value={model.typologyRemarks}
				/>
				{/*<li>
					<label>Functional aspects</label>
					<Input
						onChange={this.props.handleChange.bind(this, "functionalAspects")}
						value={model.functionalAspects} />
				</li>*/}
				<li className="well">
					<label>Specific Phenomena</label>
					<MultiForm
						{...this.props}
						addButtonValue="+"
						attr={"specificPhenomena"}
						component={SpecificPhenomena}
						model={specificPhenomenaModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						values={model.specificPhenomena}
					/>
				</li>
				<LiTextarea
					label="General remarks on function and form"
					onChange={this.props.handleChange.bind(this, "generalObservations")}
					value={model.generalObservations}
				/>
				<li className="well">
					<label>Bibliography</label>
					<MutableList
						editable
						onChange={this.props.handleChange.bind(this, "bibliographies")}
						values={model.bibliographies}
					/>
				</li>
			</ul>
		);
	}
}

MarginUnit.propTypes = {
	facetData: React.PropTypes.object,
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
	handleDelete: React.PropTypes.func,
	persons: React.PropTypes.array,
};

export default form(MarginUnit);
