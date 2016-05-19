import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Login, Federated } from 'hire-login';
import { userLogin } from 'actions/user';
import { newCodex } from 'actions/codices';
import { meUrl } from 'src/config';

const Header = (props) =>
	<header>
		<h1>
			<Link to="/">Marginal Scholarship</Link>
		</h1>
		<div className="logos">
			<img
				alt="Koninklijke Nederlandse Akademie van Wetenschappen"
				className="knaw"
				src="/images/knaw-logo.svg"
				title="Koninklijke Nederlandse Akademie van Wetenschappen"
			/>
			<img
				alt="Huygens ING"
				className="huygens"
				src="/images/huygens-logo.svg"
				title="Huygens ING"
			/>
			<img
				alt="Nederlandse Organisatie voor Wetenschappelijk Onderzoek"
				className="nwo"
				src="/images/nwo-logo.svg"
				title="Nederlandse Organisatie voor Wetenschappelijk Onderzoek"
			/>
		</div>
		<Login
			appId="hi-marschol2"
			loggedInLabel=""
			onChange={props.userLogin}
			tokenPrefix="Federated "
			userUrl={meUrl}
		>
			<Federated url="https://secure.huygens.knaw.nl/saml2/login" />
		</Login>
		<button className="add-codex" onClick={() => props.newCodex()}>Add codex</button>
	</header>;

Header.propTypes = {
	newCodex: PropTypes.func,
	userLogin: PropTypes.func,
};

export default connect(
	null,
	{
		newCodex,
		userLogin,
	}
)(Header);
