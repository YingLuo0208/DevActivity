const express = require("express");
const app = express();

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("./tourHandlers");

// Middleware to parse JSON
app.use(express.json());

// ROUTES

app.get("/tours", getAllTours);

app.post("/tours", createTour);

app.get("/tours/:tourId", getTourById);

app.put("/tours/:tourId", updateTour);

app.delete("/tours/:tourId", deleteTour);

// 启动服务器
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
