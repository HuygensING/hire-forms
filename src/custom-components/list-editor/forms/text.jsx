import React from "react";
import Immutable from "immutable";

import Input from "../../../components/input";
import Select from "../../../components/select";
import SelectList from "../../../components/select-list";

import textsActions from "../../../actions/texts";
import persons from "../../../stores/persons";

import {FORM} from "../../../constants";

class TextForm extends React.Component {
	componentWillReceiveProps(nextProps) {
		this.setState({model: nextProps.value.toJS()});
	}

	constructor(props) {
		super(props);

		this.state = {model: this.props.value.toJS()};
	}

	handleChange(attr, value) {
		this.state.model[attr] = value;
		this.setState({model: this.state.model});
	}

	handleUpdate() {
		textsActions.updateText(this.state.model);
	}

	render() {
		if (!this.state.model.hasOwnProperty("pid")) {
			return null;
		}

		return (
			<ul className={FORM + " texts-form"}>
				<li>
					<label>Title</label>
					<Input
						onChange={this.handleChange.bind(this, "title")}
						value={this.state.model.title} />
				</li>
				<li>
					<label>Authors</label>
					<SelectList
						onChange={this.handleChange.bind(this, "authors")}
						options={persons.getState().get("all").toJS()}
						values={this.state.model.authors} />
				</li>
				<li>
					<label>Period</label>
					<Select
						onChange={this.handleChange.bind(this, "period")}
						options={["Late Antique", "Medieval", "Antique", "Medieval(?)", "Late Antique(?)", "(empty)"]}
						value={this.state.model.period} />
				</li>
				<li>
					<label>Content types</label>
					<SelectList
						onChange={this.handleChange.bind(this, "contentTypes")}
						options={["knowledge text", "exegesis", "theology", "sermons", "history", "poetry", "grammar", "Bible", "commentary", "letters", "liberal arts", "liturgy", "hagiography", "glossary", "philosophy", "Law", "letter", "moralia", "rule", "rhetoric", "geography", "politics", "biblical commentary", "medicine", "DoK", "apocrypha", "astrology", "astronomy", "catalogue", "computus", "confession(s)", "plays", "proverbs", "sacramentary", "song", "(empty)", "calendar", "patristics", "psalterium", "synods"]}
						values={this.state.model.contentTypes} />
				</li>
				<li>
					<button onClick={this.handleUpdate.bind(this)}>Update</button>
				</li>
			</ul>
		);
	}
}

TextForm.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default TextForm;