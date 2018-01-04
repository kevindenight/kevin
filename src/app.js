import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import StatusBar from './components/statusBar/statusBar';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={StatusBar}/>
    </Router>,
    document.getElementById('app')
);