import React from 'react';

const containerStyle = {
    display: 'flex',
    margin: 'auto auto auto 48px',
};

// TODO: add icons inside buttons
const buttonStyle = {
    color: '#fff',
    fontFamily: 'Rubik',
    fontSize: '1rem',
    background: 0,
    padding: '16px 24px',
    border: 1,
    borderRadius: '6px',
    margin: 'auto 24px auto auto',
};

/**
 * @param {function} onClickRefresh Function that is called onClick.
 */
const ControlsOverlayHud = props => {
    const { onClickRefresh } = props;

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} type="submit" onClick={onClickRefresh}>
                Refresh
            </button>
            <button style={buttonStyle} type="submit">
                Fullscreen
            </button>
        </div>
    );
};

export default ControlsOverlayHud;