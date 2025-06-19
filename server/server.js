import express from 'express';
import connectedDB from './config/db.js';
import cors from 'cors';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Inngest event handling route
app.use('/api/inngest', serve({ client: inngest, functions }));

// Root route
app.get('/', (req, res) => {
  res.send("Server is live");
});

// Connect to DB and start server
await connectedDB()
  
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  
