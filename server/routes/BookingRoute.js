import express from 'express';
import { createBooking, getOccupiedSeats } from '../contollers/BookingController.js';
import { protectAdmin } from '../middleware/auth.js';






const bookingRouter=express.Router();


bookingRouter.post('/create',protectAdmin,createBooking)
bookingRouter.get('/seats/:showId',getOccupiedSeats)


export default bookingRouter;