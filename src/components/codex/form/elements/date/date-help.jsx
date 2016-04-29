import React from 'react';

export default (
	<div className="date-help">
		<h3>Date formats</h3>
		<h4>Specific</h4>
		<ul>
			<li>
				<label>Year</label>
				<span>1142</span>
			</li>
			<li>
				<label>Range</label>
				<span>1142/1145</span>
			</li>
			<li>
				<label>Date</label>
				<span>31-02-1142</span>
			</li>
			<li>
				<label>Date</label>
				<span>1142-02-31</span>
			</li>
		</ul>
		<h4>Wildcards</h4>
		<ul>
			<li>
				<label>Any year in the 1230s</label>
				<span>123?</span>
			</li>
			<li>
				<label>Any year in the 1200s</label>
				<span>12??</span>
			</li>
			<li>
				<label>Any year in the 1000s</label>
				<span>1???</span>
			</li>
		</ul>
		<h4>Uncertainty</h4>
		<ul>
			<li>
				<label>Year</label>
				<span>1142?</span>
			</li>
			<li>
				<label>Month</label>
				<span>1142-02?</span>
			</li>
			<li>
				<label>Date</label>
				<span>1142-02-31?</span>
			</li>
		</ul>
		<h4>Approximation</h4>
		<ul>
			<li>
				<label>Year</label>
				<span>1142~</span>
			</li>
			<li>
				<label>Month</label>
				<span>1142-02~</span>
			</li>
			<li>
				<label>Date</label>
				<span>1142-02-31~</span>
			</li>
		</ul>
		<small>For BC/BCE years, prepend '-' to the year: -0002-02-31</small>
	</div>
);
