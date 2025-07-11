import { clerkClient } from '@clerk/express';

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth; // ✅ التعديل هنا

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ success: false, message: "Server error during authorization" });
  }
};
