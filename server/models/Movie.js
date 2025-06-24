import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  _id: {
        type: Number, // لو بتستخدم TMDB ID كـ ref، خليه Number مش ObjectId
    ref: 'Movie',
    required: true
  },
  title: {
    type: String,
    required: true, // اسم الفيلم
  },
  overview: {
    type: String, // ملخص مختصر لقصة الفيلم
  },
  poster_path: {
    type: String, // رابط صورة البوستر (اللي بتظهر في القائمة)
  },
  backdrop_path: {
    type: String, // خلفية كبيرة للفيلم (بتظهر في التفاصيل أو الصفحة الرئيسية)
  },
  release_date: {
    type: Date, // تاريخ إصدار الفيلم
  },
  original_language: {
    type: String, // اللغة الأصلية للفيلم (en, ar, fr ...)
  },
  tagline: {
    type: String, // جملة تسويقية أو تعليق للفيلم (مثال: "Why so serious?")
  },
  genres: {
    type: Array, // أنواع الفيلم (مثال: ['Action', 'Drama'])
  },
  casts: {
    type: Array, // أسماء الممثلين الرئيسيين
  },
  vote_average: {
    type: Number, // متوسط تقييم المستخدمين (مثال: 8.1)
   
  },
  runtime: {
    type: Number, // مدة عرض الفيلم بالدقائق (مثال: 142)
  }
}, {
  timestamps: true // بيضيف automatically createdAt و updatedAt
});

export const Movie = mongoose.model('Movie', movieSchema);
