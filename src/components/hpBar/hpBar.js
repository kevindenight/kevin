import React from 'react';
import './hpBar.scss';

export default class HpBar extends React.Component {

    constructor (props) {

        super(props);
        this.updateHpValue = this.updateHpValue.bind(this);
        this.state = {'hpStatus': 'hpValue safe'};

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
                'hpStatus': 'hpValue dangerous',
                'style': {'width': `${value}%`}
            });

        } else if (value < HURT_HP_VALUE) {

            this.setState({
                'hpStatus': 'hpValue hurt',
                'style': {'width': `${value}%`}
            });

        } else {

            this.setState({
                'hpStatus': 'hpValue safe',
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
                <div className="inner">
                    <div className={this.state.hpStatus}
                        style={this.state.style}></div>
                </div>
            </div>
        );

    }

}