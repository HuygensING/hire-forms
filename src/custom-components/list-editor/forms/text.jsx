import React from "react";
import Immutable from "immutable";

import Form from "../../../form/base";
import Input from "../../../components/input";
import Select from "../../../components/select";
import SelectList from "../../../components/select-list";

import textsActions from "../../../actions/texts";
import persons from "../../../stores/persons";

import {FORM} from "../../../constants";

class TextForm extends Form {
	componentWillReceiveProps(nextProps) {
		this.setState({model: nextProps.value});
	}

	constructor(props) {
		super(props);

		this.state = {model: this.props.value};
	}

	handleChange(attr, value) {
		this.setState({model: this.state.model.set(attr, value)});
	}

	handleUpdate() {
		textsActions.updateText(this.state.model);
	}

	render() {
		return (
			<ul className={FORM}>
				<li>
					<label>Title</label>
					<Input
						onChange={this.handleChange.bind(this, "title")}
						value={this.state.model.get("title")} />
				</li>
				<li>
					<label>Authors</label>
					<SelectList
						onChange={this.handleChange.bind(this, "authors")}
						options={persons.getState().get("all").toJS()}
						value={this.state.model.get("authors")} />
				</li>
				<li>
					<label>Period</label>
					<Select
						onChange={this.handleChange.bind(this, "period")}
						options={["Late Antique", "Medieval", "Antique", "Medieval(?)", "Late Antique(?)", "(empty)"]}
						values={this.state.model.get("period")} />
				</li>
				<li>
					<label>Content types</label>
					<SelectList
						onChange={this.handleChange.bind(this, "contentTypes")}
						options={["knowledge text", "exegesis", "theology", "sermons", "history", "poetry", "grammar", "Bible", "commentary", "letters", "liberal arts", "liturgy", "hagiography", "glossary", "philosophy", "Law", "letter", "moralia", "rule", "rhetoric", "geography", "politics", "biblical commentary", "medicine", "DoK", "apocrypha", "astrology", "astronomy", "catalogue", "computus", "confession(s)", "plays", "proverbs", "sacramentary", "song", "(empty)", "calendar", "patristics", "psalterium", "synods"]}
						values={this.state.model.get("contentTypes")} />
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