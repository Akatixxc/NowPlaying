import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SpotifyLogin from './components/SpotifyLogin';
import SpotifyAuthRedirect from './components/SpotifyAuthRedirect';
import NowPlaying from './components/NowPlaying';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute Component={<NowPlaying />} />,
    },
    {
        path: '/login',
        element: <SpotifyLogin />,
    },
    {
        path: '/auth',
        element: <SpotifyAuthRedirect />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
