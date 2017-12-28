import React from 'react';

import Avatar from '../avatar/avatar';
import HpBar from '../hpBar/hpBar';

import './statusBar.scss';

export default class StatusBar extends React.Component {

    render () {

        return (
            <div className="statusBar">
                <Avatar />
                <HpBar />
            </div>
        );

    }

}