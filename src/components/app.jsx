import React from "react";
import {Login, Federated} from "hire-login";

import CodexRecord from "./codex/record";
import CodexForm from "./codex/form";
import SearchCodices from "./search";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
					<Login
                    appId="hi-marschol2"
                    userUrl="/api/current_session/user"
                    onChange={function(check) { console.log("CHECK callback!", check); }}>
                    <Federated url="https://secure.huygens.knaw.nl/saml2/login"/>
                </Login>
				</header>
				{/*<SearchCodices {...this.props} />
					<CodexRecord {...this.props} />
					<CodexForm {...this.props} />*/}
				{this.props.children}
			</div>
		);
	}
}

export default App;