import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SpotifyLogin from './components/SpotifyLogin';
import SpotifyAuthRedirect from './components/SpotifyAuthRedirect';
import NowPlaying from './components/NowPlaying';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={NowPlaying} />
                <Route path="/login" component={SpotifyLogin} />
                <Route path="/auth" component={SpotifyAuthRedirect} />
            </Switch>
        </Router>
    );
};

export default App;
