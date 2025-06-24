import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import { getAllBooking, getAllShow, getDashboardData, isAdmin } from '../contollers/Admincontroller.js';



const AdminRouter=express.Router();


AdminRouter.get('/is-admin',protectAdmin,isAdmin);
AdminRouter.get('/dashboard',protectAdmin,getDashboardData);
AdminRouter.get('/all-shows',protectAdmin,getAllShow);
AdminRouter.get('/all-boooking',protectAdmin,getAllBooking);





export default AdminRouter;