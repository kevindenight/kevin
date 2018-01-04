import React from 'react';
import $ from 'webpack-zepto';

import './background.scss';

export default class Background extends React.Component {

    componentDidMount () {

        /* eslint-disable */
        let c = $('#backgroundAni').get(0),
            w = c.width = window.innerWidth,
            h = c.height = window.innerHeight,
            ctx = c.getContext('2d'),

            opts = {

                'len': 20,
                'count': 50,
                'baseTime': 10,
                'addedTime': 10,
                'dieChance': 0.05,
                'spawnChance': 1,
                'sparkChance': 0.1,
                'sparkDist': 10,
                'sparkSize': 2,

                'color': 'hsl(hue,100%,100%)',
                'baseLight': 50,
                'addedLight': 10,
                'shadowToTimePropMult': 6,
                'baseLightInputMultiplier': 0.01,
                'addedLightInputMultiplier': 0.02,

                'cx': w / 2,
                'cy': h / 2,
                'repaintAlpha': 0.04,
                'hueChange': 0.1
            },

            tick = 0,
            lines = [],
            dieX = w / 2 / opts.len,
            dieY = h / 2 / opts.len,

            baseRad = Math.PI * 2 / 6,

            Line = function () {

                this.reset();

            },

            loop = () => {

                window.requestAnimationFrame(loop);

                ++tick;

                ctx.globalCompositeOperation = 'source-over';
                ctx.shadowBlur = 0;
                ctx.fillStyle = 'rgba(255,255,255,alp)'.replace('alp', opts.repaintAlpha);
                ctx.fillRect(0, 0, w, h);
                // ctx.globalCompositeOperation = 'difference';

                if (lines.length < opts.count && Math.random() < opts.spawnChance) {

                    lines.push(new Line());

                }

                lines.map((line) => {

                    line.beginPhase();

                });

            };

        Line.prototype.reset = function () {

            this.x = 0;
            this.y = 0;
            this.addedX = 0;
            this.addedY = 0;

            this.rad = 0;

            this.lightInputMultiplier = opts.baseLightInputMultiplier + (opts.addedLightInputMultiplier * Math.random());

            this.color = opts.color.replace('hue', tick * opts.hueChange);
            this.cumulativeTime = 0;

            this.beginPhase();

        };
        Line.prototype.beginPhase = function () {
            
            ctx.beginPath();
            ctx.moveTo(opts.cx + (this.x * opts.len), opts.cy + (this.y * opts.len));
            
            this.x += this.addedX;
            this.y += this.addedY;

            this.time = 0;
            this.targetTime = (opts.baseTime + (opts.addedTime * Math.random())) | 0;

            this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
            this.addedX = Math.cos(this.rad);
            this.addedY = Math.sin(this.rad);
            
            ctx.lineTo(opts.cx + (this.x * opts.len), opts.cy + (this.y * opts.len));
            ctx.stroke();

            if (this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
            
                this.reset();
            
            }

        };

        Line.prototype.step = function () {

            ++this.time;
            ++this.cumulativeTime;

            if (this.time >= this.targetTime) {

                this.beginPhase();

            }

            let prop = this.time / this.targetTime,
                wave = Math.sin(prop * Math.PI / 2),
                x = this.addedX * wave,
                y = this.addedY * wave;

            ctx.shadowBlur = prop * opts.shadowToTimePropMult;
            ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + (opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier)));
            ctx.fillRect(opts.cx + ((this.x + x) * opts.len), opts.cy + ((this.y + y) * opts.len), 2, 2);
        };

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);

        loop();

        window.addEventListener('resize', () => {

            w = c.width = window.innerWidth;
            h = c.height = window.innerHeight;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, w, h);

            opts.cx = w / 2;
            opts.cy = h / 2;

            dieX = w / 2 / opts.len;
            dieY = h / 2 / opts.len;

        });
        /* eslint-disable */
    }

    render () {

        return (
            <div className="background">
                <canvas id="backgroundAni"></canvas>
            </div>
        );

    }

}