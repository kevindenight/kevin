import React from 'react';
import './hpBar.scss';

export default class HpBar extends React.Component {

    constructor (props) {

        super(props);
        this.updateHpValue = this.updateHpValue.bind(this);
        this.state = {'hpStatus': 'safe'};

    }

    updateHpValue (value) {

        const DANGEROUS_HP_VALUE = 20,
            HURT_HP_VALUE = 50,
            MAX_HP_VALUE = 100,
            MIN_HP_VALUE = 0;

        if (value > MAX_HP_VALUE || value < MIN_HP_VALUE) {

            return false;

        } else if (value < DANGEROUS_HP_VALUE) {

            this.setState({
                'hpStatus': 'dangerous',
                'style': {'width': `${value}%`}
            });

        } else if (value < HURT_HP_VALUE) {

            this.setState({
                'hpStatus': 'hurt',
                'style': {'width': `${value}%`}
            });

        } else {

            this.setState({
                'hpStatus': 'safe',
                'style': {'width': `${value}%`}
            });

        }

        return false;

    }

    componentDidMount () {

        const hundard = 100,
            oneS = 1000;

        this.timerID = setInterval(
            () => {

                this.updateHpValue(Math.random() * hundard);

            },
            oneS
        );

    }

    componentWillUnmount () {

        clearInterval(this.timerID);

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