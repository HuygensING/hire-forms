export default (array) => {
	return (Array.isArray(array)) ? array : [array];
};