const Tour = require("./tourLib");

const  getAllTours = (req, res) => {
  const tours = Tour.getAll();
  res.status(200).json(tours);
};

const createTour = (req, res) => {
  const {name, info, image, price} = req.body;

  if (!name || !info || !image || price === undefined) {
    return res.status(400).json({ message: "Bad Request: Missing required fields" });
  }

  const newTour = Tour.addOne(name, info, image, price);

  if (newTour) {
    res.status(201).json(newTour);
  } else {
    res.status(500).json({ message: "Failed to create tour" });
  }
};

const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);

  if (tour) {
    res.status(200).json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const {name, info, image, price} = req.body;

  if (!name && !info && !image && price === undefined) {
    return res.status(400).json({ message: "Bad Request: No fields to update" });
  }

  const updatedTour = Tour.updateOneById(tourId, {name, info, image, price});

  if (updatedTour) {
    res.status(200).json(updatedTour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const deleteTour = (req, res) => {
  const tourId = req.params.tourId;
  const isDeleted = Tour.deleteOneById(tourId);

  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
