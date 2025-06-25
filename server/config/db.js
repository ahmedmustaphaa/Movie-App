import mongoose from "mongoose";

// اتصال بقاعدة البيانات باستخدام URI من env
const connectedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
    console.log("URI:", process.env.MONGODB_URI); // ✅ لازم تطبع الرابط
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // خروج من التطبيق في حالة الفشل
  }
};

export default connectedDb;
