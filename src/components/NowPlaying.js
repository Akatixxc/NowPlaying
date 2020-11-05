import React, { useEffect, useState } from 'react';
import { usePalette } from 'react-palette';

import Profile from './Profile';
import request from '../helpers/apiHelper';
import Background from './Background/Background';

/**
 * Fetches:
 * Currently playing song: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
 * Current songs features: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 * Current songs audio analysis: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
const NowPlaying = () => {
    const [currentSong, setCurrentSong] = useState(() => ({
        progress: 0,
        duration: 1000,
        name: 'Playing',
        artist: 'Now',
        album: 'https://i.scdn.co/image/ab67616d0000b273dd4ac4cfc5e06be76ed24543',
        id: '',
    }));
    const [features, setFeatures] = useState(() => ({
        energy: 0,
    }));
    const [analysis, setAnalysis] = useState(() => ({
        segments: [{ start: 0, timbre: [], pitches: [] }],
        sections: [],
    }));

    const { data: palette } = usePalette(currentSong.album);

    useEffect(() => {
        const getCurrentSong = async () => {
            try {
                const resCP = await request('https://api.spotify.com/v1/me/player/currently-playing');

                // If not AD
                if (resCP.item.type === 'track') {
                    const resAF = await request(`https://api.spotify.com/v1/audio-features/${resCP.item.id}`);
                    // console.log(resAF);
                    setFeatures(resAF);

                    const resAA = await request(`https://api.spotify.com/v1/audio-analysis/${resCP.item.id}`);
                    // console.log(resAA);
                    setAnalysis(resAA);

                    const resCP2 = await request('https://api.spotify.com/v1/me/player/currently-playing');
                    // console.log(resCP);
                    setCurrentSong(() => ({
                        progress: resCP2.progress_ms,
                        duration: resCP2.item.duration_ms,
                        name: resCP2.item.name,
                        album: resCP2.item.album.images[1].url,
                        artist: resCP2.item.artists.map(artist => artist.name).join(', '),
                        id: resCP2.item.id,
                    }));
                } else {
                    // If AD is playing fetches song after 30 seconds
                    setCurrentSong({
                        ...currentSong,
                        progress: 0,
                        duration: 30000,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        const interval = setInterval(() => getCurrentSong(), currentSong.duration - currentSong.progress + 1000);

        return () => {
            clearInterval(interval);
        };
    });

    // For debugging
    function refresh() {
        setCurrentSong({
            ...currentSong,
            progress: 0,
            duration: 1000,
        });
    }

    return (
        <div>
            <Profile />
            <Background
                song={currentSong.name}
                artist={currentSong.artist}
                album={currentSong.album}
                palette={palette}
                segments={analysis.segments}
                progress={currentSong.progress}
                sections={analysis.sections}
                energy={features.energy}
            />

            <button type="button" onClick={() => refresh()}>
                Refresh
            </button>
        </div>
    );
};

export default NowPlaying;
