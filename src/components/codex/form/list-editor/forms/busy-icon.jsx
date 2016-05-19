import React from 'react';

const BusyIcon = () =>
	<svg
		className="busy-icon"
		viewBox="0 0 38 38"
	>
		<defs>
			<linearGradient
				x1="8.042%"
				y1="0%"
				x2="65.682%"
				y2="23.865%"
				id="z8dZZfS3A"
			>
				<stop stopColor="#666" stopOpacity="0" offset="0%" />
				<stop stopColor="#666" stopOpacity=".631" offset="63.146%" />
				<stop stopColor="#666" offset="100%" />
			</linearGradient>
		</defs>
		<g fill="none" fillRule="evenodd">
			<g transform="translate(1 1)">
				<path
					d="M33 18c0-9.94-8.06-18-18-18"
					stroke="url(#z8dZZfS3A)"
					strokeWidth="4"
				>
				</path>
				<circle
					fill="#666"
					cx="33"
					cy="18"
					r="2"
				>
				</circle>
			</g>
		</g>
	</svg>;

export default BusyIcon;
