import React from 'react';

import StatusBar from '../statusBar/statusBar';
import Background from '../background/background';

export default class Home extends React.Component {

    render () {

        return (
            <React.Fragment>
                <StatusBar />
                <Background />
            </React.Fragment>
        );

    }

}