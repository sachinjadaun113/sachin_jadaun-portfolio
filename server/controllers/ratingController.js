import Rating from "../models/Rating.js";

// Create rating - Public
export const createRating = async (req, res) => {
  try {
    const {
      visitorId,
      rating,
      name,
      email,
      description,
    } = req.body;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID is required",
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if this visitor already rated
    const existingRating = await Rating.findOne({ visitorId });

    if (existingRating) {
      return res.status(409).json({
        success: false,
        message: "You have already rated this portfolio",
      });
    }

    const newRating = await Rating.create({
      visitorId,
      rating,
      name,
      email,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback!",
      rating: newRating,
    });
  } catch (error) {
    // Handle duplicate visitorId
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already rated this portfolio",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all ratings - Public
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .select("-visitorId")
      .sort({ createdAt: -1 });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? (
            ratings.reduce((sum, item) => sum + item.rating, 0) /
            totalRatings
          ).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      totalRatings,
      averageRating: Number(averageRating),
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single rating - Owner only
export const getRating = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      rating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete rating - Owner only
export const deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};