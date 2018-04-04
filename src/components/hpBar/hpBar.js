import React from 'react';
import './hpBar.scss';

const DANGEROUS_HP_VALUE = 20,
    HURT_HP_VALUE = 50,
    MAX_HP_VALUE = 100,
    MIN_HP_VALUE = 0;

export default class HpBar extends React.Component {

    constructor (props) {

        super(props);
        this.updateHpValue = this.updateHpValue.bind(this);
        this.state = {'hpStatus': 'safe'};

    }

    updateHpValue (value) {

        if (value > MAX_HP_VALUE || value < MIN_HP_VALUE) {

            return false;

        } else if (value < DANGEROUS_HP_VALUE) {

            this.setState({'hpStatus': 'dangerous'});

        } else if (value < HURT_HP_VALUE) {

            this.setState({'hpStatus': 'hurt'});

        } else {

            this.setState({'hpStatus': 'safe'});

        }

        this.setState({'style': {'width': `${value}%`}});

        return false;

    }

    componentDidMount () {

        /*
         * This.timerID = setInterval(
         *     () => {
         *
         *         this.updateHpValue(Math.random() * MAX_HP_VALUE);
         *
         *     },
         *     1000
         * );
         */

        const ws = new WebSocket('ws://127.0.0.1:3000');

        ws.onopen = () => {

            ws.send('kevin is online now');

        };

        ws.onmessage = (event) => {

            let data = JSON.parse(event.data);

            this.updateHpValue(data.hpValue);

        };

    }

    componentWillUnmount () {

        // ClearInterval(this.timerID);

    }

    render () {

        return (
            <div className="hpBar">
                <div className="hp">
                    <div className="inner">
                        <div className={`hpValue ${this.state.hpStatus || ''}`}
                            style={this.state.style}></div>
                    </div>
                </div>
                <div className="status bleeding">
                    <svg>
                        <defs>
                            <clipPath id="bleeding">
                                <path d="M8.2,3 l-3,8 c-2,8 8,8 6,0"/>
                            </clipPath>
                        </defs>

                        <rect x="0" y="0" width="18" height="20"
                            style={{
                                'clipPath': 'url(#bleeding)',
                                'fill': '#ffffff',
                                'stroke': 'none'
                            }}/>
                    </svg>
                </div>
            </div>
        );

    }

}