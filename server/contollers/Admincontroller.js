import { Booking } from "../models/Booking.js";
import { Show } from "../models/Show.js";
import { User } from "../models/User.js";



export const isAdmin=async (req,res)=>{
    res.json({success:true,isAdmin:true})
}

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });

    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() }
    }).populate('movie');

    const totalUsers = await User.countDocuments(); // ✅ تم تصحيح الاسم هنا

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUsers // ✅ الاسم بعد التصحيح
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllShow=async (req,res)=>{
  try{   
    const shows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1})
 res.status(200).json({
      success: true,
     shows
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
}}

export const getAllBooking=async (req,res)=>{

  try{
      const bookings=await Booking.find({}).populate('user').populate({path:'show',populate:{path:'movie'}}).sort({createdAt:-1});
      res.json({success:true,bookings})
  }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
}
}