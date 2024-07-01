const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRoutes = require("./routes/data");
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect("mongodb://localhost:27017/Intern")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });
app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
