import React from 'react';

import ExitFullscreenIcon from './svg/ExitFullscreenIcon';
import FullscreenIcon from './svg/FullscreenIcon';
import SynchronizeIcon from './svg/SynchronizeIcon';

const containerStyle = {
    display: 'flex',
    margin: 'auto auto auto 48px',
};

const buttonStyle = {
    color: '#fff',
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: '1rem',
    background: 0,
    padding: '16px 24px',
    border: 1,
    borderRadius: '6px',
    margin: 'auto 24px auto auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const iconContainerStyle = {
    margin: 'auto 12px auto auto',
};

/**
 * @param {function} onClickSync Function that is called onClick.
 * @param {function} onClickFullscreen Function that is called onClick.
 */
function ControlsOverlayHud(props) {
    const { onClickSync, onClickFullscreen } = props;

    const fullscreenText = () => (!document.fullscreenElement ? 'Fullscreen' : 'Exit Fullscreen');

    const fullscreenIcon = () =>
        !document.fullscreenElement ? <FullscreenIcon style={iconContainerStyle} /> : <ExitFullscreenIcon style={iconContainerStyle} />;

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} type="button" onClick={onClickSync}>
                <SynchronizeIcon style={iconContainerStyle} />
                Synchronize
            </button>
            <button style={buttonStyle} type="button" onClick={onClickFullscreen}>
                {fullscreenIcon()}
                {fullscreenText()}
            </button>
        </div>
    );
}

export default ControlsOverlayHud;
