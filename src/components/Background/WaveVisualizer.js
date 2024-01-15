import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import getCount from '../../helpers/arrayHelper';

/**
 * Returns wave vizualizer
 *
 * @param {Array} segments Contains segment data.
 * @param {integer} progress Songs progress in ms.
 * @param {float} energy Songs energy between 0 to 1. Higher the more energetic.
 * More info about segments and sections: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
const WaveVisualizer = props => {
    const { segments, progress, energy } = props;

    const segStartArray = segments.map(segArray => segArray.start);
    const segLoudnessArray = segments.map(segArray => segArray.loudness_max);
    const segPitchArray = segments.map(segArray => segArray.pitches.indexOf(1));

    const ref = useRef();
    const clock = new THREE.Clock();

    const linePathPoints = 100;
    const lineLength = 30;
    const lineX = -15;
    const lineY = 0.5;
    const lineZ = -2.5;

    let linePath = []; // [x, y, z, ...]
    let clockProgress = 0;
    let segmentCount = getCount(segStartArray, progress);
    let amplitude = 0;
    let pitch = 0; // Values between 0-11 (C-B)
    let waveLength = 0;
    let velocity = 0; // Increase between frames to make the wave move

    // Makes the wave amplitude higher around 50 (x = 0)
    const adjustMiddle = point => 1 - Math.abs(point - linePathPoints / 2) / linePathPoints;

    useFrame(() => {
        clockProgress = clock.getElapsedTime() + progress / 1000;
        linePath = [];
        velocity += 0.2 * energy;

        // Updates segmentCount if next segment has started
        if (clockProgress >= segStartArray[segmentCount + 1]) {
            segmentCount += 1;
        }
        // Adjusts amplitude based on current segment loudness
        amplitude *= 0.99;
        if (amplitude < (segLoudnessArray[segmentCount] + 60) / 60) {
            amplitude += 0.02;
        }
        // Adjusts pitch towards segmentPitch
        if (segPitchArray[segmentCount] < pitch && pitch > 0) {
            pitch -= 0.05 + 0.05 * energy;
            velocity += 0.1 * energy;
        } else if (segPitchArray[segmentCount] > pitch && pitch < 11) {
            pitch += 0.05 + 0.05 * energy;
            velocity += 0.55 * energy;
        }
        // Create new wavePath
        waveLength = 0.06 + pitch / 24;
        for (let point = 0; point < linePathPoints; point += 1) {
            linePath.push(lineX + (lineLength / linePathPoints) * point);
            linePath.push(adjustMiddle(point) * Math.sin(point * waveLength - velocity) * amplitude + lineY);
            linePath.push(lineZ);
        }
        ref.current.setPoints(linePath);
    });

    return (
        <mesh>
            <meshLine ref={ref} attach="geometry" />
            {/*<meshLineMaterial attach="material" transparent opacity={0.5} lineWidth={0.05} color="white" />*/}
        </mesh>
    );
};

export default WaveVisualizer;
