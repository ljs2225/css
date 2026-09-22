import { Router } from 'express';
import { validateAchievementInput } from '../validators/achievements.validator.js';
import { listAchievements, createAchievement } from '../controllers/achievements.controller.js';

const router = Router();

router.get('/', listAchievements);
router.post('/', validateAchievementInput, createAchievement);

export default router;
