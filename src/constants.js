const ABBREV = "hire";
const SEPARATOR = "-";

const PREFIX = ABBREV + SEPARATOR;

export default {
	FORM: `${PREFIX}form`,
	MULTIFORM: `${PREFIX}multi${SEPARATOR}form`,
	SELECT: `${PREFIX}select`,
	SELECTLIST: `${PREFIX}select${SEPARATOR}list`,
	MULTISELECT: `${PREFIX}multi${SEPARATOR}select`,
	INPUT: `${PREFIX}input`,
	TEXTAREA: `${PREFIX}textarea`,
	CHECKBOX: `${PREFIX}checkbox`,
	AUTOCOMPLETE: `${PREFIX}autocomplete`,
	OPTIONS: `${PREFIX}options`,
	COMBOLIST: `${PREFIX}combo${SEPARATOR}list`,
	AUTOCOMPLETELIST: `${PREFIX}autocomplete${SEPARATOR}list`,
	LIST: `${PREFIX}list`,
	LISTITEM: `${PREFIX}list${SEPARATOR}item`,
	MULTABLELIST: `${PREFIX}mutable${SEPARATOR}list`,
	LABEL: `${PREFIX}label`,
	LISTFILTER: `${PREFIX}list${SEPARATOR}filter`,
	STATICLIST: `${PREFIX}static${SEPARATOR}list`
};