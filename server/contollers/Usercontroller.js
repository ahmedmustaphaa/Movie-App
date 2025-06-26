// import { clerkClient } from "@clerk/express";
// import { Booking } from "../models/Booking.js";
// import { Movie } from "../models/movie.js";

// export const getUserBookings=async (req,res)=>{
//     try{

//         const user=req.auth().userId;


//         const bookings=await Booking.find({user}).populate({
//             path:'show',
//             populate:{path:'movie'}
//         }).sort({createdAt:-1})
//       res.json({success:true,bookings})
//     }catch(error){
// console.error(error.message);

// res.json({success:false,message:error.message})
//     }
// }
// export const updateFavorite = async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     const userId = req.auth().userId;

//     const user = await clerkClient.users.getUser(userId);

//     // لو مفيش favorites، أنشئ Array فاضي
//     if (!user.privateMetadata.favorites) {
//       user.privateMetadata.favorites = [];
//     }

//     // لو الفيلم مش موجود ضيفه، لو موجود احذفه
//     if (user.privateMetadata.favorites.includes(movieId)) {
//       user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
//         (item) => item !== movieId
//       );
//     } else {
//       user.privateMetadata.favorites.push(movieId);
//     }

//     // تحديث بيانات المستخدم
//     await clerkClient.users.updateUserMetadata(userId, {
//       privateMetadata: user.privateMetadata
//     });

//     res.json({ success: true, message: "Favorite movies updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
// export const getFavorites = async (req, res) => {
//   try {
//     const user = await clerkClient.users.getUser(req.auth().userId);
//     const favorites = user.privateMetadata.favorites;

//     // جلب تفاصيل الأفلام من قاعدة البيانات
//     const movies = await Movie.find({ _id: { $in: favorites } });

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
