import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import request from '../helpers/apiHelper';
import LogoutIcon from './svg/LogoutIcon';

const containerStyle = {
    display: 'flex',
};

const profilePictureStyle = {
    height: '50px',
    border: '2px solid #ffffff99',
    borderRadius: '50px',
    margin: 'auto 24px auto auto',
};

const nameStyle = {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#fff',
    margin: 'auto 24px auto auto',
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

const Profile = () => {
    const history = useHistory();
    const [profile, setProfile] = useState({
        name: '',
        picture: '',
    });

    useEffect(() => {
        request('https://api.spotify.com/v1/me')
            .then(res => {
                setProfile({
                    name: res.display_name,
                    picture: res.images[0].url,
                });
            })
            .catch(err => err);
    }, []);

    const deleteAccessToken = () => {
        sessionStorage.clear();
        history.push('/login');

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <div style={containerStyle}>
            <p style={nameStyle}>{profile.name}</p>
            <img style={profilePictureStyle} src={profile.picture} alt="" />
            <button type="submit" style={buttonStyle} onClick={deleteAccessToken}>
                <LogoutIcon style={iconContainerStyle} />
                Logout
            </button>
        </div>
    );
};

export default Profile;
