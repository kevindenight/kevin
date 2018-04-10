import React from 'react';

import './saoButton.scss';

export default class SaoButton extends React.Component {

    constructor (props) {

        super(props);
        this.clickHandler = this.clickHandler.bind(this);

    }

    clickHandler (event) {

        if (typeof this.props.handler === 'function') {

            this.props.handler(event);

        }

    }

    render () {

        return (
            <div className={`saoButton ${this.props.class}`} onClick={this.clickHandler}>{this.props.text}</div>
        );

    }

}