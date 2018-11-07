import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configDev from '../config/webpack.dev.js';
import configProd from '../config/webpack.prod.js';
import logger from 'morgan';
import compress from 'compression';
import expressWinston from 'express-winston';
import http from 'http';
import WebSocket from 'ws';
import winstonInstance from './winston';
import routes from './routes/index.route';

const isDev = process.env.NODE_ENV !== 'production';
const config = isDev ? configDev : configProd;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});


if (isDev) {

    app.use(logger('dev'));

    const compiler = webpack(config);

    /*
     * Tell express to use the webpack-dev-middleware and use the webpack.config.js
     * configuration file as a base.
     */

    app.use(webpackDevMiddleware(
        compiler,
        {'publicPath': config.output.publicPath}
    ));

    app.use(webpackHotMiddleware(compiler));

}

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.use(cookieParser());
app.use(compress());

app.use('/api', routes);

// Log error in winston transports except when executing test suite
if (config.env !== 'test') {

    app.use(expressWinston.errorLogger({winstonInstance}));

}


// Websocket init

// Do nothing
function noop () {}

// WebSocket thread heartbeat
function heartbeat () {

    this.isAlive = true;

}

wss.on('connection', (ws, req) => {

    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('message', (message) => {

        console.info('received: %s', message);

    });

});

// Check all WebSocket thread status every 30 seconds
const wsStatusCheckInterval = setInterval(() => {

    wss.clients.forEach((ws) => {

        if (ws.isAlive === false) {

            clearInterval(ws.hpInterval);

            return ws.terminate();

        }

        ws.isAlive = false;
        ws.ping(noop);

        return ws;

    });

}, 30000);

export {
    server,
    wss
};