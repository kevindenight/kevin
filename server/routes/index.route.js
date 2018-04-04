import express from 'express';
import statusRoutes from './status.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// Mount status routes at /status
router.use('/status', statusRoutes);

export default router;