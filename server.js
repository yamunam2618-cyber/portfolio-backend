console.log("Starting server...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT MONGODB
mongoose.connect("mongodb+srv://yamunam2618_db_user:Yamuna1234@cluster0.tikwxam.mongodb.net/portfolioDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error ❌", err));
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