let castArray = (array) =>
	(Array.isArray(array)) ? array : [array]

const formatMarginRatio = (pageHeight, pageWidth, textHeightMin, textHeightMax, textWidthMin, textWidthMax) => {
	const pageSurface = pageWidth * pageHeight;
	const textRatioMin = Math.round((textWidthMin * textHeightMin) / pageSurface * 100);
	const textRatioMax = Math.round((textWidthMax * textHeightMax) / pageSurface * 100);
	if (isNaN(textRatioMin) || isNaN(textRatioMax)) return '?';
	const ratios = (textRatioMax !== 0) ?
		`${100 - textRatioMax} - ${100 - textRatioMin}` :
		100 - textRatioMin;

	return ratios + "%";
}

export {castArray, formatMarginRatio};
