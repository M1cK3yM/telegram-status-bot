import { Router } from 'express';
import { createStatus } from '../controllers/status_controller';

export const router = Router();
router.post('/status', createStatus);
