import React from 'react';
import form from 'hire-forms-form';
import MultiForm from 'hire-forms-multi-form';
import Input from 'hire-forms-input';
import SelectList from 'hire-forms-select-list';
import MutableList from 'hire-forms-mutable-list';
import Person from 'formElements/person';
import Date from 'formElements/date';
import MarginType from './margin-type';
import SpecificPhenomena from './specific-phenomena';
import LiTextarea from 'formElements/li-textarea';
import { personModel, marginTypeModel, marginUnitModel, specificPhenomenaModel } from 'src/models';

function MarginUnit(props) {
	const model = { ...marginUnitModel, ...props.formData };

	return (
		<ul className="codex-form">
			<li className="well">
				<ul>
					<Date value={model.date} onChange={props.handleChange.bind(this, 'date')} />
					<li>
						<label>Relative date</label>
						<Input
							onChange={props.handleChange.bind(this, "relativeDate")}
							value={model.relativeDate}
						/>
					</li>
					<li>
						<label>Language</label>
						<SelectList
							onChange={props.handleChange.bind(this, "languages")}
							options={props.facetData.facet_s_margin_language}
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
					onChange={props.handleChange}
					onDelete={props.handleDelete}
					persons={props.persons}
					values={model.annotators}
				/>
			</li>
			<li className="well">
				<ul>
					<li>
						<label>Script types</label>
						<SelectList
							onChange={props.handleChange.bind(this, "scriptTypes")}
							options={props.facetData.facet_s_margin_script_type}
							values={model.scriptTypes}
						/>
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							onChange={props.handleChange.bind(this, "handCount")}
							value={model.handCount}
						/>
					</li>
				</ul>
			</li>
			<LiTextarea
				label="Script remarks"
				onChange={props.handleChange.bind(this, "scriptsRemarks")}
				value={model.scriptsRemarks}
			/>
			<li className="well">
				<label>Annotation type</label>
				<MultiForm
					{...props}
					addButtonValue="+"
					attr={"marginTypes"}
					component={MarginType}
					model={marginTypeModel}
					onChange={props.handleChange}
					onDelete={props.handleDelete}
					values={model.marginTypes}
				/>
			</li>
			<LiTextarea
				label="Annotation type remarks"
				onChange={props.handleChange.bind(this, "typologyRemarks")}
				value={model.typologyRemarks}
			/>
			<li className="well">
				<label>Specific Phenomena</label>
				<MultiForm
					{...props}
					addButtonValue="+"
					attr={"specificPhenomena"}
					component={SpecificPhenomena}
					model={specificPhenomenaModel}
					onChange={props.handleChange}
					onDelete={props.handleDelete}
					values={model.specificPhenomena}
				/>
			</li>
			<LiTextarea
				label="General remarks on function and form"
				onChange={props.handleChange.bind(this, 'generalObservations')}
				value={model.generalObservations}
			/>
			<li className="well">
				<label>Bibliography</label>
				<MutableList
					editable
					onChange={props.handleChange.bind(this, 'bibliographies')}
					values={model.bibliographies}
				/>
			</li>
		</ul>
	);
}

MarginUnit.propTypes = {
	facetData: React.PropTypes.object,
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
	handleDelete: React.PropTypes.func,
	persons: React.PropTypes.array,
};

export default form(MarginUnit);
