import express from 'express';
import { addShow, getNowPlayingMovie } from '../contollers/showContoller.js';
import { protectAdmin } from '../middleware/auth.js';
import { getShows } from '../contollers/showContoller.js';
import { Show } from '../models/Show.js';
import { Movie } from '../models/Movie.js';




const showRouter=express.Router();

showRouter.post('/add',protectAdmin, addShow);
showRouter.get('/mow-playing',getNowPlayingMovie)
showRouter.get('/all',getShows)
showRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // جلب جميع العروض المستقبلية المرتبطة بالفيلم
    const shows = await Show.find({ movie: id, showDateTime: { $gte: new Date() } });

    // جلب بيانات الفيلم
    const movie = await Movie.findById(id);

    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id
      });
    });

    res.json({
      success: true,
      shows,     // لاحظ: بدل "show" المفرد
      movie,
      dateTime
    });

  } catch (error) {
    console.error("Error fetching show:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});




export default showRouter