import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import request from '../helpers/apiHelper';

const headerStyle = {
    position: 'absolute',
    zIndex: '99',
    width: '100%',
    padding: '50px 0px 50px 0px',
};

const headerInnerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
};

const profilePictureStyle = {
    height: '50px',
    border: '1px solid #333',
    borderRadius: '50px',
    margin: '0 25px 0 0',
};

const nameStyle = {
    fontFamily: 'Roboto',
    margin: 'auto 50px auto 0',
};

const logoutButton = {
    color: '#fff',
    fontWeight: '600',
    background: '#333',
    padding: '16px 24px',
    borderRadius: '6px',
    margin: '0 50px 0 0',
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
    };

    return (
        <div style={headerStyle}>
            <div style={headerInnerStyle}>
                <img style={profilePictureStyle} src={profile.picture} alt="" />
                <p style={nameStyle}>{profile.name}</p>
                <button type="submit" style={logoutButton} onClick={deleteAccessToken}>
                    LOGOUT
                </button>
            </div>
        </div>
    );
};

export default Profile;
