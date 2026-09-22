import { Router } from 'express';
import { validateSessionInput } from '../validators/sessions.validator.js';
import {
  listSessions,
  createSession,
  deleteSession,
} from '../controllers/sessions.controller.js';

const router = Router();

router.get('/', listSessions);
router.post('/', validateSessionInput, createSession);
router.delete('/:id', deleteSession);

export default router;
