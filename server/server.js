import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectedDb from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js'
import showRouter from './routes/showRoute.js';
import bookingRouter from './routes/BookingRoute.js';
import AdminRouter from './routes/AdminRouter.js';
import favRouter from './routes/favouriteRouter.js';
import { clerkMiddleware } from '@clerk/express'



const app = express();
const port = 3000;

// Middleware
app.use(clerkMiddleware())


app.use(express.json());

app.use(cors());
app.use('/api/show',showRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/admin',AdminRouter);
app.use('/api/user',favRouter);

app.use("/api/inngest", serve({ client: inngest, functions }));
await connectedDb()
// API Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.listen(port, () => 
  console.log(`Server listening at http://localhost:${port}`)
);