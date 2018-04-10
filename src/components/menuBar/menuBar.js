import React from 'react';
import _ from 'lodash';

import SaoButton from '../saoButton/saoButton';

import './menuBar.scss';

export default class MenuBar extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            'menuStart': false,
            'status': 'close'
        };

    }

    componentDidMount () {

        let startAt = 0,
            moveDis = 0,
            position = {
                'x': 0,
                'y': 0
            },
            detector = _.throttle(() => {

                if (moveDis > 100) {

                    this.setState({
                        'menuStart': true,
                        'status': 'open',
                        'style': {
                            'top': `${position.y}px`,
                            'left': `${position.x}px`
                        }
                    });

                }

            }, 200);

        $('body').on('mousedown.menuBar', (event) => {

            startAt = event.clientY;

        });

        $('body').on('mousemove.menuBar', (event) => {

            if (!this.state.menuStart && startAt !== 0) {

                moveDis = event.clientY - startAt;
                position.x = event.clientX;
                position.y = event.clientY;
                detector();

            }

        });

        $('.menuBar-mask').on('click.menuBar', () => {

            if (this.state.menuStart) {

                this.setState({
                    'menuStart': false,
                    'status': 'close'
                });
                startAt = 0;

            }

        });

    }

    handler (event) {

        console.log(`${event.target} clicked`);

    }

    render () {

        return (
            <React.Fragment>
                <div className={`menuBar ${this.state.status}`} style={this.state.style}>
                    <SaoButton class="menuItem" text="Info" handler={this.handler}/>
                    <SaoButton class="menuItem" text="Equ" handler={this.handler}/>
                    <SaoButton class="menuItem" text="Skill" handler={this.handler}/>
                    <SaoButton class="menuItem" text="Setting" handler={this.handler}/>
                    <SaoButton class="menuItem" text="ME" handler={this.handler}/>
                </div>
                <div className={`menuBar-mask ${this.state.status}`}></div>
            </React.Fragment>
        );

    }

}