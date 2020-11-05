import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Private route checks if user has spotify-access-token.
 * If user has token he will be redirected to NowPlaying.
 * Else user will be redirected to /login.
 * @param {Component} component Component contains NowPlaying component.
 */
const PrivateRoute = ({ component: Component }) => {
    const [loading, setLoading] = useState(true);
    const [tokenExists, setTokenExists] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('spotify-access-token') !== null) {
            setLoading(false);
            setTokenExists(true);
        } else {
            setLoading(false);
            setTokenExists(false);
        }
    }, []);

    function direct(props) {
        if (loading) {
            return (
                <div>
                    <p>loading</p>
                </div>
            );
        }
        if (tokenExists) {
            return <Component />;
        }
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location },
                }}
            />
        );
    }

    return <Route render={props => direct(props)} />;
};

export default PrivateRoute;
