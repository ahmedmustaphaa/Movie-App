import express from 'express';
import { getFavorites, getUserBookings, updateFavorite } from '../contollers/Usercontroller.js';
import { protectAdmin } from '../middleware/auth.js';


const favRouter=express.Router();

favRouter.get('/bookings',protectAdmin,getUserBookings);
favRouter.post('/update-favorite',updateFavorite);
favRouter.get('/get-favorite',protectAdmin,getFavorites);



export default favRouter;