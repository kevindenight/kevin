import express from 'express';
import WebSocket from 'ws';
import {wss} from '../express';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/updateHpValue').
    post((req, res) => {

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

export default router;