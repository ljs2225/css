import { Router } from 'express';
import { getCurrentTutor } from '../controllers/tutor.controller.js';

const router = Router();

// MVP: no auth, this always returns the single seeded tutor.
router.get('/', getCurrentTutor);

export default router;
