ABBREV = "hire"
SEPARATOR = "-"

PREFIX = ABBREV + SEPARATOR

module.exports = do ->
	FORM: "#{PREFIX}form"
	MULTIFORM: "#{PREFIX}multi#{SEPARATOR}form"
	SELECT: "#{PREFIX}select"
	MULTISELECT: "#{PREFIX}multi#{SEPARATOR}select"
	INPUT: "#{PREFIX}input"
	TEXTAREA: "#{PREFIX}textarea"
	CHECKBOX: "#{PREFIX}checkbox"
	AUTOCOMPLETE: "#{PREFIX}autocomplete"
	AUTOCOMPLETEOPTIONS: "#{PREFIX}autocomplete#{SEPARATOR}options"
	COMBOLIST: "#{PREFIX}combo#{SEPARATOR}list"
	LIST: "#{PREFIX}list"
	LISTITEM: "#{PREFIX}list#{SEPARATOR}item"
	MULTABLELIST: "#{PREFIX}mutable#{SEPARATOR}list"
	LABEL: "#{PREFIX}label"