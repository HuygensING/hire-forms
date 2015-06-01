import React from "react";

/**
 * A string or an object,
 * example: {key: "somekey", value: "somevalue"}.
 */
export const stringOrKeyValue = React.PropTypes.oneOfType([
	React.PropTypes.string,
	React.PropTypes.shape({
		key: React.PropTypes.string,
		value: React.PropTypes.string
	})
]);

export const stringOrArrayOfString = React.PropTypes.oneOfType([
	React.PropTypes.string,
	React.PropTypes.arrayOf(React.PropTypes.string)
]);

export const arrayOfKeyValue = React.PropTypes.arrayOf(
	React.PropTypes.shape({
		key: React.PropTypes.string,
		value: React.PropTypes.string
	})
);

/**
 * An array of strings or an array of key/value objects,
 * example: [{key: "somekey", value: "somevalue"}].
 */
export const arrayOfStringOrArrayOfKeyValue = React.PropTypes.oneOfType([
	React.PropTypes.arrayOf(React.PropTypes.string),
	React.PropTypes.arrayOf(
		React.PropTypes.shape({
			key: React.PropTypes.string,
			value: React.PropTypes.string
		})
	)
]);