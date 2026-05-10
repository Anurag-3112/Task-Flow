require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CONFIG
const PORT = process.env.PORT || 5000;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo API is running"
  });
});

app.use("/", todoRoutes);

// ERROR HANDLDER
app.use(errorHandler);

// STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});