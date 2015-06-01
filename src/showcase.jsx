import React from "react/addons";
import Immutable from "immutable";

import MutableList from "./components/mutable-list";
import List from "./components/list";
import Autocomplete from "./components/autocomplete";
import Select from "./components/select";
import SelectList from "./components/select-list";

class Showcase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			values: [],
			options: ["zondag", "Maandag", "dinsdag", "woensdag", "Donderdag", "vrijdag", "zaterdag"]
		};
	}

	handleChange(value) {
		let state = (value instanceof Immutable.List) ?
			{list: value} :
			{value: value};

		this.setState(state);
	}

	handleValueChange(value) {
		this.setState({value: value});
	}

	handleValuesChange(values) {
		this.setState({values: values});
	}

	render() {
		return (
			<div className="showcase">
				<nav className="menu">
					<ol>
						<li>Select</li>
						<li>Select list</li>
						<li>Autocomplete</li>
						<li>Autcomplete list</li>
						<li>List</li>
						<li>Mutable list</li>
					</ol>
				</nav>
				<div className="elements">
					<h2>Select</h2>
					<div className="element-type">
						<h3>Default</h3>
						<div className="input-container">
							<Select
								onChange={this.handleChange.bind(this)}
								options={this.state.options}
								placeholder="Start typing or use the arrow ===>"
								sortRelevance={false}
								value={this.state.value} />
						</div>
					</div>

					<h2>Select list</h2>
					<div className="element-type lists">
						<h3>Default</h3>
						<SelectList
							onChange={this.handleValuesChange.bind(this)}
							options={this.state.options}
							placeholder="Start typing for instant suggestions..."
							values={this.state.values} />
					</div>

					<h2>Autocomplete</h2>
					<div className="element-type inputs">
						<h3>Default</h3>
						<div className="input-container">
							<Autocomplete
								onChange={this.handleValueChange.bind(this)}
								options={this.state.options}
								placeholder="Start typing for instant suggestions..."
								value={this.state.value} />
						</div>
						<h3>Async</h3>
						<div className="input-container">
							<Autocomplete
								async={this}
								onChange={this.handleValueChange.bind(this)}
								placeholder="Start typing for async suggestions..."
								value={this.state.value} />
						</div>
					</div>

					<h2>List</h2>
					<div className="element-type lists">
						<h3>Default</h3>
						<List values={this.state.options} />
						<h3>Ordered</h3>
						<List
							ordered={true}
							values={this.state.options} />
						<h3>Editable</h3>
						<List
							editable={true}
							onChange={this.handleChange.bind(this)}
							values={this.state.options} />
					</div>

					<h2>Mutable list</h2>
					<div className="element-type lists">
						<h3>Default</h3>
						<MutableList
							onChange={this.handleChange.bind(this)}
							placeholder="Type something to add to the list..."
							values={this.state.values} />
						<h3>Ordered</h3>
						<MutableList
							onChange={this.handleChange.bind(this)}
							ordered={true}
							placeholder="Type something to add to the list..."
							values={this.state.values} />
					</div>
				</div>
			</div>
		);
	}
}

export default Showcase;