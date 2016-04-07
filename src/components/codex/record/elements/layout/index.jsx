import React from "react";
import Text from "../text";
import LayoutCanvas from "./canvas";
import {formatMarginRatio} from "../../../../../utils"


class Layout extends React.Component {
	render() {
		let layout = this.props.data;

		// let ratioHeightMin = Math.round((layout.textHeightMin / this.props.pageHeight) * 100)
		// let ratioHeightMax = Math.round((layout.textHeightMax / this.props.pageHeight) * 100)
		// let ratioWidthMin = Math.round((layout.textWidthMin / this.props.pageWidth) * 100)
		// let ratioWidthMax = Math.round((layout.textWidthMax / this.props.pageWidth) * 100)
		// let ratioHeight = (ratioHeightMin !== ratioHeightMax && ratioHeightMax !== 0) ? (ratioHeightMin + "-" + ratioHeightMax + "%") : ratioHeightMin+"%"
		// let ratioWidth = (ratioWidthMin !== ratioWidthMax && ratioWidthMax !== 0) ? (ratioWidthMin + "-" + ratioWidthMax + "%") : ratioWidthMin+"%"

		let lines = (layout.linesMax > 0 && layout.linesMin !== layout.linesMax) ? layout.linesMin + " to " + layout.linesMax : layout.linesMin;
		const lineHeight = (layout.lineHeight > 0) ?
			<small>({layout.lineHeight}mm high)</small> :
			null;

		let blockSizeHeight = (layout.textHeightMax > 0 && layout.textHeightMin !== layout.textHeightMax) ? layout.textHeightMin + " - " + layout.textHeightMax : layout.textHeightMin
		let blockSizeWidth = (layout.textWidthMax > 0 && layout.textWidthMin !== layout.textWidthMax) ? layout.textWidthMin + " - " + layout.textWidthMax : layout.textWidthMin

		// let pageSurface = this.props.pageWidth * this.props.pageHeight;
		// let textRatioMin = Math.round((layout.textWidthMin * layout.textHeightMin) / pageSurface * 100);
		// let textRatioMax = Math.round((layout.textWidthMax * layout.textHeightMax) / pageSurface * 100);

		const marginRatio = formatMarginRatio(
			this.props.pageHeight,
			this.props.pageWidth,
			layout.textHeightMin,
			layout.textHeightMax,
			layout.textWidthMin,
			layout.textWidthMax
		)

		return (
			<li className="layout">
				<Text label="Number of lines">{lines}{lineHeight}</Text>
				<Text label="Text block size">{`${blockSizeHeight} x ${blockSizeWidth}mm`}</Text>
				<Text label="Margin ratio">{marginRatio}</Text>
				<Text label="Remarks">{layout.remarks}</Text>
				<LayoutCanvas blocks={layout.blockHeights} columns={layout.columnWidths}/>
			</li>
		);
	}
}

Layout.propTypes = {
	children: React.PropTypes.string,
	data: React.PropTypes.object,
	label: React.PropTypes.string,
	pageHeight: React.PropTypes.number,
	pageWidth: React.PropTypes.number
}

export default Layout;
