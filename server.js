require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 AEORRA Review Backend Running on port ${PORT}`);
});
