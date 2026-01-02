const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminAuth = require("../middlewares/adminAuth");
const {
  createReview,
  getApprovedReviewsByProduct,
  getPendingGrouped,
  approveReview,
  rejectReview,
} = require("../controllers/reviewController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images", 5), createReview);
router.get("/product/:handle", getApprovedReviewsByProduct);

router.get("/admin/pending", adminAuth, getPendingGrouped);
router.put("/admin/:id/approve", adminAuth, approveReview);
router.delete("/admin/:id/reject", adminAuth, rejectReview);

module.exports = router;
