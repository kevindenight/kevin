import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Home from './components/home/home';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>,
    document.getElementById('app')
);