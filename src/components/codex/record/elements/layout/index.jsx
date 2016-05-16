import React from 'react';
import Text from '../text';
import LayoutCanvas from './canvas';
import { formatMarginRatio } from 'utils';

function Layout(props) {
	const layout = props.data;

	let lines = (layout.linesMax > 0 && layout.linesMin !== layout.linesMax) ?
		`${layout.linesMin} to ${layout.linesMax}` :
		layout.linesMin;
	const lineHeight = (layout.lineHeight > 0) ?
		<small>({layout.lineHeight}mm high)</small> :
		null;

	const blockSizeHeight =
		(layout.textHeightMax > 0 && layout.textHeightMin !== layout.textHeightMax) ?
		`${layout.textHeightMin} - ${layout.textHeightMax}` :
		layout.textHeightMin;

	const blockSizeWidth =
		(layout.textWidthMax > 0 && layout.textWidthMin !== layout.textWidthMax) ?
		`${layout.textWidthMin} - ${layout.textWidthMax}` :
		layout.textWidthMin;

	const marginRatio = formatMarginRatio(
		props.pageHeight,
		props.pageWidth,
		layout.textHeightMin,
		layout.textHeightMax,
		layout.textWidthMin,
		layout.textWidthMax
	);

	return (
		<li className="layout">
			<Text label="Number of lines">{lines}{lineHeight}</Text>
			<Text label="Text block size">{`${blockSizeHeight} x ${blockSizeWidth}mm`}</Text>
			<Text label="Margin ratio">{marginRatio}</Text>
			<Text label="Remarks">{layout.remarks}</Text>
			<LayoutCanvas
				horizontalLayout={layout.horizontalLayout}
				verticalLayout={layout.verticalLayout}
			/>
		</li>
	);
}

Layout.propTypes = {
	children: React.PropTypes.string,
	data: React.PropTypes.object,
	label: React.PropTypes.string,
	pageHeight: React.PropTypes.number,
	pageWidth: React.PropTypes.number,
};

export default Layout;
