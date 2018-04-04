import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Home from './components/home/home';

import './assets/reset.scss';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>,
    document.getElementById('app')
);