/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import React, { forwardRef, useMemo } from 'react';
import { useLoader, useUpdate } from 'react-three-fiber';

const Text = forwardRef((props, ref) => {
    const { children, vAlign = 'center', hAlign = 'center', size = 1, position } = props;
    const font = useLoader(THREE.FontLoader, 'helvetiker_bold.typeface.json');
    const config = useMemo(() => ({ font, size: 10, height: 1 }), [font]);
    const mesh = useUpdate(
        self => {
            const boxSize = new THREE.Vector3();
            self.geometry.computeBoundingBox();
            self.geometry.boundingBox.getSize(boxSize);
            self.position.x = hAlign === 'center' ? -boxSize.x / 2 : hAlign === 'right' ? 0 : -boxSize.x;
            self.position.y = vAlign === 'center' ? -boxSize.y / 2 : vAlign === 'top' ? 0 : -boxSize.y;
        },
        [children],
    );
    return (
        <group ref={ref} scale={[0.1 * size, 0.1 * size, 0.1 * size]} position={position}>
            <mesh ref={mesh} castShadow>
                <textGeometry attach="geometry" args={[children, config]} />
                <meshPhysicalMaterial attach="material" color="white" />
            </mesh>
        </group>
    );
});

export default Text;
