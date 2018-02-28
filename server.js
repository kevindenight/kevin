import http from 'http';
import WebSocket from 'ws';
import app from './server/express';

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// Routes
app.post('/updateHpValue', (req, res) => {

    console.log(`request from app: ${JSON.stringify(req.body)}`);

    // Send hp value to clients via WebSocket
    const {hpValue} = req.body;

    wss.clients.forEach((ws) => {

        try {

            if (ws.readyState === WebSocket.OPEN) {

                ws.send(JSON.stringify({hpValue}));

            }

        } catch (e) {

            console.log('ws send messange error:', e);

        }

    });

    res.json({
        'status': 'ok',
        hpValue
    });

});

// Websocket test

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

        console.log('received: %s', message);

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

server.listen(3000, () => {

    console.info('Listening on %d', server.address().port);

});