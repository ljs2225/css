import { Router } from 'express';
import { validateStudentInput } from '../validators/students.validator.js';
import { listStudents, createStudent } from '../controllers/students.controller.js';

const router = Router();

router.get('/', listStudents);
router.post('/', validateStudentInput, createStudent);

export default router;
