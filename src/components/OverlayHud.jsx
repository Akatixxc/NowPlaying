import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import ControlsOverlayHud from './OverlayHudControls';
import Profile from './Profile';
import Logo from './Logo';

const mouseDetectorStyle = (top, height) => ({
    top,
    height,
    width: '100%',
    position: 'absolute',
    zIndex: '1',
});

const hudContainerStyle = (height) => ({
    height,
    backgroundColor: '#ffffff80',
    display: 'flex',
});

const logoStyle = {
    margin: 'auto auto auto 24px',
};

const dividerStyle = {
    flex: 1,
};

/**
 * @param {function} onClickSync Function that is passed for OverlayHudControls component.
 */
function OverlayHud(props) {
    const { onClickSync, onClickFullscreen } = props;
    const [hudTop, setHudTop] = useState(0);
    const hudHeight = 150;

    const aProps = useSpring({
        hudTop,
        detectAreaHeight: hudTop !== 0 ? hudHeight * 2 : hudHeight,
    });

    return (
        <animated.div
            style={mouseDetectorStyle(aProps.hudTop, aProps.detectAreaHeight)}
            onMouseEnter={() => setHudTop(0)}
            onMouseLeave={() => setHudTop(-hudHeight)}
        >
            <div style={hudContainerStyle(hudHeight)}>
                <Logo size={1.3} style={logoStyle} />
                <ControlsOverlayHud onClickSync={onClickSync} onClickFullscreen={onClickFullscreen} />
                <div style={dividerStyle} />
                <Profile />
            </div>
        </animated.div>
    );
}

export default OverlayHud;
