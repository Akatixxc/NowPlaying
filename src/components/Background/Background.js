import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useLoader, useFrame } from '@react-three/fiber';
import { useSpring, a } from 'react-spring';
import { OrbitControls, Trail /*, MeshLineMaterial*/ } from '@react-three/drei';

import Text from './Text';
import FlickeringLight from './FlickeringLight';
import WaveVisualizer from './WaveVisualizer';

/*
 Extends three packets to react-three-fiber
 OrbitControls is used in CustomCamera
 MeshLine and MeshLineMaterial are used in WaveVisualizer
 */
extend({ OrbitControls, Trail /*, MeshLineMaterial*/ });

/**
 * @param {string} url Album cover url.
 */
const AlbumCover = props => {
    const { url } = props;

    const texture = useLoader(THREE.TextureLoader, url);

    return (
        <mesh position={[-2.5, 0.5, 0]} rotation={[0, 0, 0]} castShadow>
            <boxBufferGeometry attach="geometry" args={[2.5, 2.5, 0]} />
            <meshPhysicalMaterial attach="material" map={texture} />
        </mesh>
    );
};

/**
 * @param {string} color Color of the plane.
 * @param {Array} position [x, y, z] floats.
 * @param {Array} rotation [xAxis, yAxis, zAxis] floats in radians.
 * @param {Array} size [x, y] floats.
 */
const Plane = props => {
    const { color, position, rotation, size } = props;

    const animationProps = useSpring({
        color: color !== undefined ? color : 'grey',
        config: {
            duration: 5000,
        },
    });

    return (
        <a.mesh position={position} rotation={rotation} receiveShadow>
            <planeBufferGeometry attach="geometry" args={size} />
            <a.meshPhysicalMaterial attach="material" color={animationProps.color} />
        </a.mesh>
    );
};

/**
 * @param {string} song Song name.
 * @param {string} artist Artist name.
 */
const Title = props => {
    const { song, artist } = props;

    function getScale(length) {
        if (length <= 9) {
            return 1;
        }
        if (length <= 11) {
            return 0.8;
        }
        if (length <= 14) {
            return 0.6;
        }
        if (length <= 21) {
            return 0.4;
        }
        if (length <= 27) {
            return 0.3;
        }
        if (length <= 40) {
            return 0.2;
        }
        return 0.15;
    }

    return (
        <group>
            <Suspense fallback={null}>
                <Text position={[-1, 0.9, 0]} hAlign="right" vAlign="top" size={getScale(artist.length) * 0.5}>
                    {artist}
                </Text>
                <Text position={[-1, 0.8, 0]} hAlign="right" vAlign="bottom" size={getScale(song.length)}>
                    {song}
                </Text>
            </Suspense>
        </group>
    );
};

const CustomCamera = () => {
    const ref = useRef();
    const amplitude = 0.1;
    const waveLength = 0.25;

    useFrame(({ clock }) => {
        ref.current.parent.rotation.x = Math.sin(clock.getElapsedTime() * waveLength) * amplitude;
        ref.current.parent.rotation.y = Math.sin(clock.getElapsedTime() * waveLength * 2) * amplitude;
        ref.current.parent.rotation.z = Math.sin(clock.getElapsedTime() * waveLength) * amplitude;
    });

    return <OrbitControls enablePan={false} ref={ref} enableZoom={false} enableDamping dampingFactor={0.5} />;
};

/**
 * @param {string} song Song name.
 * @param {string} artist Artist name.
 * @param {string} url Album cover url.
 * @param {object} palette Contains 6 different colors based on album cover
 * @param {Array} segments Contains segment data.
 * @param {Array} sections Contains section data.
 * @param {integer} progress Songs progress in ms.
 * @param {float} energy Songs energy between 0 to 1. Higher the more energetic.
 * More info about segments and sections: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
const Background = React.memo(props => {
    const { song, artist, album, palette, segments, sections, progress, energy } = props;

    return (
        <Canvas
            shadowMap
            camera={{ position: [0, 0.5, 5] }}
            onCreated={({ gl }) => {
                // eslint-disable-next-line no-param-reassign
                gl.shadowMap.enabled = true;
                // eslint-disable-next-line no-param-reassign
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
        >
            <fog attach="fog" args={[palette.darkMuted, 15, 25]} />
            <ambientLight intensity={0.5} />
            <Title song={song} artist={artist} />
            <WaveVisualizer segments={segments} progress={progress} energy={energy} />
            <CustomCamera />
            <Suspense fallback={null}>
                <FlickeringLight segments={segments} progress={progress} sections={sections} energy={energy} />
            </Suspense>
            <Suspense fallback={null}>
                <AlbumCover url={album} />
            </Suspense>
            <Suspense fallback={null}>
                <Plane position={[0, 11.2, -5]} size={[100, 25]} color={palette.vibrant} rotation={[0, 0, 0]} />
                <Plane position={[0, -1.3, 0]} size={[100, 10]} color={palette.muted} rotation={[-Math.PI / 2, 0, 0]} />
            </Suspense>
        </Canvas>
    );
});

export default Background;
