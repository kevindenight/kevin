import React from 'react';
import ReactDOM from 'react-dom';

import Avatar from './components/avatar/avatar';
import HpBar from './components/hpBar/hpBar';

ReactDOM.render(
    <div>
        <Avatar />
        <HpBar />
    </div>,
    document.getElementById('app')
);