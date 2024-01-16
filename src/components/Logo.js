import React from 'react';

/**
 * Returns NowPlaying logo.
 * @param {string} color Color of the logos font.
 * @param {size} size Size of the logo.
 * @param {styleSheet} style Additional styling for logo div.
 */
const Logo = (props) => {
	const { color = '#fff', size = 1, style } = props;

	const logoDivStyle = {
		fontFamily: 'Rubik',
		fontSize: `${size * 2}rem`,
		fontWeight: '500',
		color,
		MozUserSelect: 'none',
		WebkitUserSelect: 'none',
		msUserSelect: 'none',
		...style,
	};

	const nowStyle = {
		margin: `${(size * 2) / 3}rem 0 0 0`,
		lineHeight: `${size}rem`,
	};

	const playingStyle = {
		margin: `0 0 ${size / 3}rem 0`,
	};

	return (
		<div style={logoDivStyle}>
			<p style={nowStyle}>Now</p>
			<p style={playingStyle}>Playing</p>
		</div>
	);
};

export default Logo;
