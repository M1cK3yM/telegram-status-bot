import { Router } from 'express';
import { createStatus, getMyStatuses, latestStatuses } from '../controllers/status_controller';

export const router = Router();
router.post('/status', createStatus);
router.get('/latest', latestStatuses);
router.get('/mystatus/:userId', getMyStatuses);
