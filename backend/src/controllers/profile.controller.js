import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorResponse.js";

// ---------------- GET PROFILE ----------------
export const getMe = async (req, res, next) => {
  try {
    // Find user and remove password field
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- UPDATE PROFILE ----------------
export const updateMe = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(new ErrorResponse("Name is required", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    return res.json({
      success: true,
      message: "Profile updated",
      data: updatedUser,
    });

  } catch (err) {
    next(err);
  }
};
