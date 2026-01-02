const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");

/* ===============================
   SUBMIT REVIEW (PUBLIC)
================================ */
exports.createReview = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files) {
      for (let file of req.files) {
        const upload = await cloudinary.uploader.upload(file.path);
        imageUrls.push(upload.secure_url);
      }
    }

    const review = new Review({
      product: {
        handle: req.body.productHandle,
        title: req.body.productTitle,
      },
      user: {
        name: req.body.name,
      },
      rating: req.body.rating,
      comment: req.body.comment,
      images: imageUrls,
    });

    await review.save();

    res.json({ message: "Review submitted & waiting for approval" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   GET APPROVED REVIEWS (PRODUCT)
================================ */
exports.getApprovedReviewsByProduct = async (req, res) => {
  const reviews = await Review.find({
    "product.handle": req.params.handle,
    status: "approved",
  }).sort({ createdAt: -1 });

  res.json(reviews);
};

/* ===============================
   ADMIN: PENDING REVIEWS GROUPED
================================ */
exports.getPendingGrouped = async (req, res) => {
  const reviews = await Review.find({ status: "pending" });

  const grouped = {};

  reviews.forEach((r) => {
    const handle = r.product.handle;
    if (!grouped[handle]) {
      grouped[handle] = {
        productTitle: r.product.title,
        reviews: [],
      };
    }
    grouped[handle].reviews.push(r);
  });

  res.json(grouped);
};

/* ===============================
   ADMIN: APPROVE REVIEW
================================ */
exports.approveReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });

  res.json({ message: "Review approved" });
};

/* ===============================
   ADMIN: REJECT REVIEW
================================ */
exports.rejectReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);

  res.json({ message: "Review rejected & deleted" });
};
