const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      handle: { type: String, required: true },
      title: String,
    },

    user: {
      name: String,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    images: [String],

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
