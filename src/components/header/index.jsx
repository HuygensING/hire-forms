import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Login, Federated } from 'hire-login';
import { userLogin } from 'actions/user';
import { newCodex } from 'actions/codices';
import { meUrl } from 'src/config';

function Header({ newCodex, userLogin }) {
	return (
		<header>
			<h1>
				<Link to="/">Marginal Scholarship</Link>
				<span className="add-codex" onClick={() => newCodex()}>+</span>
				{/*<Link className="add-codex" to="/codex/edit">+</Link>*/}
			</h1>
			<div className="logos">
				<img
					className="knaw"
					src="/images/knaw-logo.svg"
					title="Koninklijke Nederlandse Akademie van Wetenschappen"
				/>
				<img
					className="huygens"
					src="/images/huygens-logo.svg"
					title="Huygens ING"
				/>
				<img
					className="nwo"
					src="/images/nwo-logo.svg"
					title="Nederlandse Organisatie voor Wetenschappelijk Onderzoek"
				/>
			</div>
			<Login
				appId="hi-marschol2"
				loggedInLabel=""
				onChange={userLogin}
				tokenPrefix="Federated "
				userUrl={meUrl}>
				<Federated url="https://secure.huygens.knaw.nl/saml2/login" />
			</Login>
		</header>
	);
}

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
