import React from 'react';

/**
 * @param {Object} props Style Object which is passed for svg component
 */
const LogoutIcon = props => {
    const { style } = props;

    return (
        <svg width="24" style={style} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.447715 0.447715 0 1 0H13C13.5523 0 14 0.447715 14 1V6.86667C14 7.41895 13.5523 7.86667 13 7.86667C12.4477 7.86667 12 7.41895 12 6.86667V2H2V22H12V17.1333C12 16.581 12.4477 16.1333 13 16.1333C13.5523 16.1333 14 16.581 14 17.1333V23C14 23.5523 13.5523 24 13 24H1C0.447715 24 0 23.5523 0 23V1ZM17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289L23.7071 11.2929C24.0976 11.6834 24.0976 12.3166 23.7071 12.7071L18.7071 17.7071C18.3166 18.0976 17.6834 18.0976 17.2929 17.7071C16.9024 17.3166 16.9024 16.6834 17.2929 16.2929L20.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H20.5858L17.2929 7.70711C16.9024 7.31658 16.9024 6.68342 17.2929 6.29289Z"
                fill="white"
            />
        </svg>
    );
};

export default LogoutIcon;
