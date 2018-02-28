import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from '../config/webpack.dev.js';
import logger from 'morgan';
import compress from 'compression';
import expressWinston from 'express-winston';
import winstonInstance from './winston';

const app = express();
const compiler = webpack(config);

/*
 * Tell express to use the webpack-dev-middleware and use the webpack.config.js
 * configuration file as a base.
 */
app.use(webpackDevMiddleware(
    compiler,
    {'publicPath': config.output.publicPath}
));

if (config.env !== 'production') {

    app.use(logger('dev'));

}

app.use(webpackHotMiddleware(compiler));

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.use(cookieParser());
app.use(compress());

// Log error in winston transports except when executing test suite
if (config.env !== 'test') {

    app.use(expressWinston.errorLogger({winstonInstance}));

}

export default app;