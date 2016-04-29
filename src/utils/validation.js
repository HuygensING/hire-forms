export const validateDate = (value) => {
	const re = /^\-?\d{1,4}((\/?)\-?\d{1,4})?(~|\?)?$/;
	let valid = re.test(value);

	if (valid) {
		const matches = re.exec(value);

		if (matches && matches[1]) {
			const startYear = matches[0].substr(0, matches[0].indexOf('/'));
			const endYear = matches[1].substr(1);

			valid = parseInt(startYear, 10) < parseInt(endYear, 10);
		}
	}

	return {
		isValid: valid,
		message: 'Single year (dddd(~|?)) or range (dddd/dddd(~|?)).',
	};
};

// UNUSED?
export const validateNumbersOnly = (value) => {
	const re = /^\d+$/;
	return {
		isValid: re.test(value),
		message: 'Should contain only numbers.',
	};
};
