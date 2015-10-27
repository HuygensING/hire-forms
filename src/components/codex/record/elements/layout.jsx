import React from "react";
import Text from "./text";

class Layout extends React.Component {
	render() {
		let layout = this.props.data;

		let ratioHeightMin = Math.round((layout.textHeightMin / this.props.pageHeight) * 100)
		let ratioHeightMax = Math.round((layout.textHeightMax / this.props.pageHeight) * 100)
		let ratioWidthMin = Math.round((layout.textWidthMin / this.props.pageWidth) * 100)
		let ratioWidthMax = Math.round((layout.textWidthMax / this.props.pageWidth) * 100)
		let ratioHeight = (ratioHeightMin !== ratioHeightMax && ratioHeightMax !== 0) ? (ratioHeightMin + "-" + ratioHeightMax + "%") : ratioHeightMin+"%"
		let ratioWidth = (ratioWidthMin !== ratioWidthMax && ratioWidthMax !== 0) ? (ratioWidthMin + "-" + ratioWidthMax + "%") : ratioWidthMin+"%"

		let lines = (layout.linesMax > 0 && layout.linesMin !== layout.linesMax) ? layout.linesMin + " to " + layout.linesMax : layout.linesMin;
		lines = lines + " lines";
		lines = (layout.lineHeight > 0) ? lines + " of " + layout.lineHeight + " mm height" : lines

		let blockSizeHeight = (layout.textHeightMax > 0 && layout.textHeightMin !== layout.textHeightMax) ? layout.textHeightMin + " - " + layout.textHeightMax : layout.textHeightMin
		let blockSizeWidth = (layout.textWidthMax > 0 && layout.textWidthMin !== layout.textWidthMax) ? layout.textWidthMin + " - " + layout.textWidthMax : layout.textWidthMin

		let pageSurface = this.props.pageWidth * this.props.pageHeight;
		let textRatioMin = Math.round((layout.textWidthMin * layout.textHeightMin) / pageSurface * 100);
		let textRatioMax = Math.round((layout.textWidthMax * layout.textHeightMax) / pageSurface * 100);

		let marginRatioMin = 100 - textRatioMax;
		let marginRatioMax = 100 - textRatioMin;

		return (
			<div className="layout">
				<Text label="">{lines}</Text>
				<Text label="Text block size">{`${blockSizeHeight} x ${blockSizeWidth} mm`}</Text>
				<Text label="Text block ratio">{`${textRatioMin} - ${textRatioMax}%`}</Text>
				<Text label="Margin ratio">{`${marginRatioMin} - ${marginRatioMax}%`}</Text>
			</div>
		);
	}
}

Layout.propTypes = {
	label: React.PropTypes.string,
	children: React.PropTypes.string
}

export default Layout;

//- ul.layouts
//- 	for layout in codex.get('pageLayouts')
//- 		- console.log(codex)


//- 		li
//- 			ul
//- 				li= lines
//- 				if layout.foliaCount > 0
//- 					li ${layout.foliaCount} pages: #{layout.pages}
//- 				li Text block size: #{blockSize}
//- 				li Text block ratio: #{ratioHeight} x #{ratioWidth}
//- 				li Margin ratio: #{marginRatioHeight} x #{marginRatioWidth}
//- 				li.canvas
//- 					canvas