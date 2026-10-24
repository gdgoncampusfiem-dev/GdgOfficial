import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import teamRoutes from './routes/teamRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Enable CORS for frontend development and production origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsers with 10MB payload limit to support Base64 photo uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'GDG Kolkata API is running',
    version: '1.0.0',
    endpoints: {
      team: '/api/team',
    },
  });
});

// Mount Routes
app.use('/api/team', teamRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`🚀[routes]: Team API mounted at http://localhost:${port}/api/team`);
});
