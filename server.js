console.log("Starting server...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT MONGODB
mongoose.connect("mongodb://yamunam2618_db_user:Yamuna1234@ac-rogdk2s-shard-00-00.tikwxam.mongodb.net:27017,ac-rogdk2s-shard-00-01.tikwxam.mongodb.net:27017,ac-rogdk2s-shard-00-02.tikwxam.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-v7lozv-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));
// SCHEMA
const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// ROUTE
app.post("/feedback", async (req, res) => {
  try {
    console.log(req.body);
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.json({ message: "Feedback saved successfully!" });
  } catch {
    res.status(500).json({ message: "Error saving feedback" });
  }
});

// SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});