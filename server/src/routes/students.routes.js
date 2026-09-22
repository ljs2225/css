import { Router } from 'express';
import { validateStudentInput } from '../validators/students.validator.js';
import {
  listStudents,
  getStudent,
  createStudent,
  endTutoring,
} from '../controllers/students.controller.js';

const router = Router();

router.get('/', listStudents);
router.post('/', validateStudentInput, createStudent);
router.get('/:id', getStudent);
router.patch('/:id/end', endTutoring);

export default router;
