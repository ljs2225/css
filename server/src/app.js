import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import tutorRoutes from './routes/tutor.routes.js';
import studentsRoutes from './routes/students.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';
import achievementsRoutes from './routes/achievements.routes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());

  app.use('/api/tutor', tutorRoutes);
  app.use('/api/students', studentsRoutes);
  app.use('/api/sessions', sessionsRoutes);
  app.use('/api/achievements', achievementsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
