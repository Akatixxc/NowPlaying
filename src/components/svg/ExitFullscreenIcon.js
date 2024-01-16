import React from 'react';

/**
 * @param {Object} props Style Object which is passed for svg component
 */
const ExitFullscreenIcon = (props) => {
	const { style } = props;

	return (
		<svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 0C8.55228 1.78814e-07 9 0.447716 9 1L9 8C9 8.55229 8.55228 9 8 9L1 9C0.447716 9 5.36442e-07 8.55229 4.76837e-07 8C4.17233e-07 7.44772 0.447716 7 1 7L7 7L7 1C7 0.447715 7.44772 -2.38418e-07 8 0ZM16 5.96047e-07C16.5523 5.96047e-07 17 0.447716 17 1V7L23 7C23.5523 7 24 7.44772 24 8C24 8.55229 23.5523 9 23 9L16 9C15.7348 9 15.4804 8.89464 15.2929 8.70711C15.1054 8.51957 15 8.26522 15 8V1C15 0.447716 15.4477 5.96047e-07 16 5.96047e-07ZM0 17C0 16.4477 0.447715 16 1 16H8C8.55228 16 9 16.4477 9 17V23C9 23.5523 8.55228 24 8 24C7.44772 24 7 23.5523 7 23V18H1C0.447715 18 0 17.5523 0 17ZM16 17C16 16.4477 16.4477 16 17 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H18V23C18 23.5523 17.5523 24 17 24C16.4477 24 16 23.5523 16 23V17Z"
				fill="white"
			/>
		</svg>
	);
};

export default ExitFullscreenIcon;
