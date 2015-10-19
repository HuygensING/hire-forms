import React from "react";
import cx from "classnames";

import form from "hire-forms-form";
import MultiForm from "hire-forms-multi-form";

// FORM COMPONENTS
import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import SelectList from "hire-forms-select-list";
import MutableList from "hire-forms-mutable-list";

// FORMS
import DateAndLocalityForm from "../date-and-locality";
import Person from "../person";
import MarginType from "./margin-type";
import SpecificPhenomena from "./specific-phenomena";

import {personModel, marginTypeModel, marginUnitModel, specificPhenomenaModel} from "../../../../models";

class MarginUnit extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = {...marginUnitModel, ...this.props.formData};

		return (
			<ul>
				<li>
					<label>Date</label>
					<Input
						onChange={this.props.handleChange.bind(this, "date")}
						value={model.date} />
				</li>
				<li>
					<label>Relative date</label>
					<Input
						onChange={this.props.handleChange.bind(this, "relativeDate")}
						value={model.relativeDate} />
				</li>
				<li>
					<label>Language</label>
					<SelectList
						onChange={this.props.handleChange.bind(this, "languages")}
						options={this.props.search.facetData.facet_s_margin_language}
						values={model.languages} />
				</li>
				<li className={cx({well: model.annotators.size})}>
					<label>Annotators</label>
					<MultiForm
						attr={"annotators"}
						component={Person}
						model={personModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						values={model.annotators}/>
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
				<li>
					<label>Script types</label>
					<SelectList
						onChange={this.props.handleChange.bind(this, "scriptTypes")}
						options={this.props.search.facetData.facet_s_margin_script_type}
						values={model.scriptTypes} />
				</li>
				<li>
					<label>Script remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "scriptsRemarks")}
						value={model.scriptsRemarks} />
				</li>

				<li className={cx({well: model.annotators.size})}>
					<label>Annotation type</label>
					<MultiForm
						{...this.props}
						attr={"marginTypes"}
						component={MarginType}
						model={marginTypeModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						values={model.marginTypes}/>
				</li>

				{/*<li>
					<label>Origin</label>
					<DateAndLocalityForm
						attr={"origin"}
						onChange={this.props.handleChange}
						onInvalid={this.props.handleInvalid}
						formData={model.origin} />
				</li>*/}
				<li>
					<label>Annotation type remarks</label>
					<Input
						onChange={this.props.handleChange.bind(this, "typologyRemarks")}
						value={model.typologyRemarks} />
				</li>
				{/*<li>
					<label>Functional aspects</label>
					<Input
						onChange={this.props.handleChange.bind(this, "functionalAspects")}
						value={model.functionalAspects} />
				</li>*/}
				<li className={cx({well: model.annotators.size})}>
					<label>Specific Phenomena</label>
					<MultiForm
						{...this.props}
						attr={"specificPhenomena"}
						component={SpecificPhenomena}
						model={specificPhenomenaModel}
						onChange={this.props.handleChange}
						onDelete={this.props.handleDelete}
						values={model.specificPhenomena}/>
				</li>
				<li>
					<label>General remarks on function and form</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "generalObservations")}
						value={model.generalObservations} />
				</li>
				<li>
					<label>Bibliography</label>
					<MutableList
						editable={true}
						onChange={this.props.handleChange.bind(this, "bibliographies")}
						values={model.bibliographies} />
				</li>
			</ul>
		);
	}
}

export default form(MarginUnit);