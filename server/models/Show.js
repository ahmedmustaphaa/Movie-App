import mongoose from "mongoose";
const showSchema = new mongoose.Schema({
  movie: {
    type: Number, // عشان Movie ID من TMDB
    ref: 'Movie',
    required: true
  },
  showDateTime: {
    type: Date,
    required: true
  },
  showPrice: {
    type: Number,
    required: true
  },
  occupiedSeats: {
    type: [String], // مثل ['A1', 'B5', 'C3']
    default: []     // ✅ المهم جدًا
  }
}, {
  timestamps: true
});


export const Show= mongoose.model('Show', showSchema);
