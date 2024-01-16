import React from 'react';

import Logo from './Logo';

const containerStyle = {
    height: '100%',
};

const centeredContainerStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

const loginButtonStyle = {
    color: '#fff',
    fontFamily: 'Rubik',
    fontWeight: 'thin',
    fontSize: '1rem',
    background: '#1DB954',
    padding: '16px 24px',
    border: 0,
    borderRadius: '6px',
};

const textStyle = {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    color: '#ffffff80',
    margin: '0 0 1rem 0',
};

function SpotifyLogin() {
    // helper function to generate a random string
    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // helper function to generate a random number
    const getRandomInt = (min, max) => {
        const newMin = Math.ceil(min);
        const newMax = Math.floor(max);
        return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
    };

    const initiateSpotifyLogin = async () => {
        function sha256(plain) {
            // returns promise ArrayBuffer
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest('SHA-256', data);
        }

        function base64urlencode(a) {
            // Convert the ArrayBuffer to string using Uint8 array.
            // btoa takes chars from 0-255 and base64 encodes.
            // Then convert the base64 encoded to base64url encoded.
            // (replace + with -, replace / with _, trim trailing =)
            return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        async function pkceChallengeFromVerifier(v) {
            const base64encoded = base64urlencode(await sha256(v));
            return base64encoded;
        }

        // Generate the code verifier and its base 64 encoded hash
        const codeVerifier = makeid(getRandomInt(43, 128));
        const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);
        const state = makeid(12);

        // Set the code verifier and state in local storage so we can check it later
        sessionStorage.setItem('spotify-code-verifier', codeVerifier);
        sessionStorage.setItem('spotify-state', state);

        // construct the authentication url
        const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-playback-state%20user-modify-playback-state%20user-read-private%20user-read-email&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

        // open the spotify authentication page
        window.open(authURL, '_self');
    };

    return (
        <div style={containerStyle}>
            <div style={centeredContainerStyle}>
                <Logo size={2} />
                <p style={textStyle}>an audio visualizer for Spotify</p>
                <button type="submit" onClick={initiateSpotifyLogin} style={loginButtonStyle}>
                    Login with Spotify
                </button>
            </div>
        </div>
    );
}

export default SpotifyLogin;
