import express from 'express';
import cors from 'cors';
import { serve } from "inngest/express";
import { inngest, functions } from "../server/inngest/index.js";
import connectedDB from "../server/config/db.js";
import { clerkMiddleware } from '@clerk/express';
import { createServerlessExpressHandler } from "@codegenie/vercel-express";

// Connect to MongoDB
await connectedDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send("✅ Serverless Express is working from Vercel!");
});

// Export handler
export default createServerlessExpressHandler(app);
