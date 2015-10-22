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
		let blockSize = blockSizeHeight + " x " + blockSizeWidth

		let marginRatioHeightMin = 100 - ratioHeightMin
		let marginRatioHeightMax = (ratioHeightMax > 0) ? 100 - ratioHeightMax : 0
		let marginRatioWidthMin = 100 - ratioWidthMin
		let marginRatioWidthMax = (ratioWidthMax > 0) ? 100 - ratioWidthMax: 0
		let marginRatioHeight = (marginRatioHeightMin !== marginRatioHeightMax && marginRatioHeightMax !== 0) ? (marginRatioHeightMin + "-" + marginRatioHeightMax + "%") : marginRatioHeightMin+"%"
		let marginRatioWidth = (marginRatioWidthMin !== marginRatioWidthMax && marginRatioWidthMax !== 0) ? (marginRatioWidthMin + "-" + marginRatioWidthMax + "%") : marginRatioWidthMin+"%"

		return (
			<div className="layout">
				<Text label="">{lines}</Text>
				<Text label="Text block size">{blockSize}</Text>
				<Text label="Text block ratio">{`${ratioHeight} x ${ratioWidth}`}</Text>
				<Text label="Margin ratio">{`${marginRatioHeight} x ${marginRatioWidth}`}</Text>
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