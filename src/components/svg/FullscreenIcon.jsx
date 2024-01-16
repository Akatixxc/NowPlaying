import React from 'react';

/**
 * @param {Object} props Style Object which is passed for svg component
 */
function FullscreenIcon(props) {
    const { style } = props;

    return (
        <svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.447715 0.447715 0 1 0H8C8.55228 0 9 0.447715 9 1C9 1.55228 8.55228 2 8 2H2V8C2 8.55228 1.55228 9 1 9C0.447715 9 0 8.55228 0 8V1ZM16 1C16 0.447715 16.4477 0 17 0H23C23.5523 0 24 0.447715 24 1V8C24 8.55228 23.5523 9 23 9C22.4477 9 22 8.55228 22 8V2H17C16.4477 2 16 1.55228 16 1ZM1 15C1.55228 15 2 15.4477 2 16L2 22H8C8.55228 22 9 22.4477 9 23C9 23.5523 8.55228 24 8 24H1C0.447716 24 3.57628e-07 23.5523 3.57628e-07 23L1.78814e-07 16C1.78814e-07 15.4477 0.447715 15 1 15ZM23 16C23.5523 16 24 16.4477 24 17L24 23C24 23.5523 23.5523 24 23 24H16C15.4477 24 15 23.5523 15 23C15 22.4477 15.4477 22 16 22H22L22 17C22 16.4477 22.4477 16 23 16Z"
                fill="white"
            />
        </svg>
    );
}

export default FullscreenIcon;
