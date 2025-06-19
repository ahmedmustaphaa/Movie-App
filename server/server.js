import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectedDb from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js'

import { clerkMiddleware } from '@clerk/express'
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use(cors());
app.use(clerkMiddleware())
app.use("/api/inngest", serve({ client: inngest, functions }));
await connectedDb()
// API Routes
app.get('/', (req, res) => res.send('Server is Live!'));

app.listen(port, () => 
  console.log(`Server listening at http://localhost:${port}`)
);