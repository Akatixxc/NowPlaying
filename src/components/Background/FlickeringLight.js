import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { a } from 'react-spring';
import getCount from '../../helpers/arrayHelper';

/*
alkio:
3 oli iha medium, reagoi rumpuihin ja crakkeihin: if x > -20
4 reagoi sub bassiin mutta vaan mataliin: if x < 20
5 iha mysteeri, mut end strippedissä valot pääl iha semisti
6 emt mut reagoi limelightin sub bassiin :D
7 nappaa melodiaan ja puheeseen aika hyvin toimii etennki lit affissa: if x > -20
8 emt xD
9 emt :D
10 iha toimiva mut en oo analysoinu viel: timbreArray[segmentCount] > -20
*/

/**
 * Returns a flickering spotlight.
 *
 * @param {Array} segments Contains segment data.
 * @param {Array} sections Contains section data.
 * @param {integer} progress Songs progress in ms.
 * @param {float} energy Songs energy between 0 to 1. Higher the more energetic.
 * More info about segments and sections: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
const FlickeringLight = (props) => {
	const { segments, sections, progress, energy } = props;

	const segStartArray = segments.map((segArray) => segArray.start);
	const segTimbreArray = segments.map((segArray) => segArray.timbre[7]);
	const secStartArray = sections.map((secArray) => secArray.start);
	const secLoudnessArray = sections.map((secArray) => secArray.loudness);

	const ref = useRef();
	const clock = new THREE.Clock();

	let clockProgress = 0;
	let segmentCount = getCount(segStartArray, progress);
	let sectionCount = getCount(secStartArray, progress);

	const timbreThreshold = -20; // timbre values vary between -100 - 100
	const segmentLength = 0.18;
	const minIntensity = 0.5;
	const maxIntensity = ((secLoudnessArray[sectionCount] + 60) / 60) * 1.3;
	const decreaseIntensity = 1 - 0.02 * energy;
	const increaseIntensity = 1 + 0.15 * energy;

	useFrame(() => {
		clockProgress = clock.getElapsedTime() + progress / 1000;
		// Updates sectionCount if next section has started
		if (clockProgress >= secStartArray[sectionCount + 1]) {
			sectionCount += 1;
		}
		// Decreases intensity to flicker the light
		if (ref.current.intensity > minIntensity) {
			ref.current.intensity *= decreaseIntensity;
		}
		// Updates segmentCount if next segment has started
		if (clockProgress >= segStartArray[segmentCount + 1]) {
			segmentCount += 1;
		}
		// If current section started in the last segmentLength
		else if (clockProgress >= segStartArray[segmentCount] + segmentLength) {
			// Increases intensity if current segments timbre was high/low enough
			if (ref.current.intensity < maxIntensity && segTimbreArray[segmentCount] > timbreThreshold) {
				ref.current.intensity *= increaseIntensity;
			}
		}
	});

	return (
		<group>
			<a.spotLight position={[3, 5, 5]} penumbra={0.5} castShadow ref={ref} />
		</group>
	);
};

export default FlickeringLight;
