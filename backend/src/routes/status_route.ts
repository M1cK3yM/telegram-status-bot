import { Router } from 'express';
import { createStatus, latestStatuses } from '../controllers/status_controller';

export const router = Router();
router.post('/status', createStatus);
router.get('/latest', latestStatuses);
