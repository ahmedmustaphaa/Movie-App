import axios from "axios"

import { Movie } from "../models/movie.js";
import { Show } from "../models/Show.js";
import { set } from "mongoose";

export const getNowPlayingMovie=async(req,res)=>{
  try{
          const {data}=await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
            headers:{
                 Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
          })

          const movies=data.results;
          res.json({success:true,movies:movies})
  }catch(error){
       res.json({success:false,message:error.message})
  }
}

export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    // تحقق من الحقول الأساسية
    if (!movieId || !Array.isArray(showsInput) || typeof showPrice !== 'number') {
      return res.status(400).json({
        success: false,
        message: "بيانات غير صالحة. تأكد من إرسال movieId, showsInput, showPrice"
      });
    }

    // التحقق من وجود الفيلم في قاعدة البيانات
    let movie = await Movie.findById(movieId);

    // إذا لم يكن الفيلم موجودًا، يتم جلبه من TMDB وحفظه
    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          }
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          }
        })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const newMovie = await Movie.create({
        _id: movieApiData.id,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline,
        genres: movieApiData.genres.map(g => g.name),
        casts: movieCreditsData.cast.slice(0, 5).map(c => c.name),
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime
      });

      movie = newMovie;
    }

    // بناء العروض لإضافتها
    const showsToCreate = [];

    showsInput.forEach(show => {
      const showDate = show.date;

      // ✅ استخدم show.times بدل show.time
      if (Array.isArray(show.times)) {
        show.times.forEach(time => {
          const dateTimeString = `${showDate}T${time}`; // مثال: 2025-06-21T18:00
          showsToCreate.push({
            movie: movieId,
            showDateTime: new Date(dateTimeString),
            showPrice,
            occupiedSeats: []
          });
        });
      }
    });

    // حفظ العروض في قاعدة البيانات
    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
      return res.status(201).json({
        success: true,
        message: "تم إضافة العروض بنجاح",
        count: showsToCreate.length
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "لا توجد عروض لإضافتها"
      });
    }

  } catch (error) {
    console.error("addShow error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ في السيرفر",
      error: error.message
    });
  }
};
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() }
    }).populate('movie').sort({ showDateTime: 1 });

    const uniqueShow = new Set(shows.map((show) => show.movie));

    res.json({
      success: true,
      shows: Array.from(uniqueShow)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


