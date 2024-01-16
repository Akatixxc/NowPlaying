import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SpotifyAuthRedirect() {
    // const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    console.log('statemuutos');
    // helper function to parse query parameters
    const getParams = (url) => {
        const params = {};
        const parser = document.createElement('a');
        parser.href = url;
        const query = parser.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i += 1) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    const params = getParams(window.location.href);
    const { code } = params;
    const { state } = params;

    const postToken = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            code_verifier: sessionStorage.getItem('spotify-code-verifier'),
        },
    };

    useEffect(() => {
        axios(postToken)
            .then((res) => {
                sessionStorage.setItem('spotify-access-token', res.data.access_token);
                console.log('redirectas');
                navigate('/', { replace: true });
            })
            .catch((err) => {
                // There was an error authenticating with the Spotify API
                console.log(err);
                setError(true);
            });
    }, []);

    // check state
    if (state !== sessionStorage.getItem('spotify-state')) {
        console.log('state not found in session storage');
        setError(true);
        return undefined;
    }

    return (
        <div>
            {/*! redirect && !error && <h3>Authenticating...</h3>}
            {redirect && <div>Authentication successful!</div> */}
            {error && <h3>There was an error authenticating with Spotify.</h3>}
        </div>
    );
}
