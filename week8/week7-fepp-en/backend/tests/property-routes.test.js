const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

// Seed data
const properties = [
  {
    title: "Modern Downtown Apartment",
    type: "Apartment",
    description: "Beautiful modern apartment in the heart of downtown with city views.",
    price: 350000,
    location: {
      address: "123 Main Street",
      city: "Boston",
      state: "MA",
      zipCode: "02101"
    },
    squareFeet: 1200,
    yearBuilt: 2020
  },
  {
    title: "Cozy Suburban House",
    type: "House",
    description: "Charming family home in quiet neighborhood with large backyard.",
    price: 450000,
    location: {
      address: "456 Oak Avenue",
      city: "Cambridge",
      state: "MA",
      zipCode: "02139"
    },
    squareFeet: 1800,
    yearBuilt: 2015
  },
];

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    username: "johndoe",
    password: "Test123!",
    phone_number: "123-456-7890",
    gender: "male",
    date_of_birth: "1990-01-01",
    role: "user",
    address: {
      street: "123 Test St",
      city: "Test City",
      state: "TS",
      zipCode: "12345"
    }
  });
  token = result.body.token;
});

describe("Protected Property Routes", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Promise.all([
      api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[0]),
      api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[1]),
    ]);
  });

  // ---------------- GET ----------------
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // ---------------- POST ----------------
  it("should create one property when POST /api/properties is called", async () => {
    const newProperty = {
      title: "Luxury Commercial Building",
      type: "Commercial",
      description: "Prime commercial space in business district.",
      price: 850000,
      location: {
        address: "789 Business Blvd",
        city: "Boston",
        state: "MA",
        zipCode: "02110"
      },
      squareFeet: 3000,
      yearBuilt: 2018
    };
    
    const response = await api
      .post("/api/properties")
      .set("Authorization", "Bearer " + token)
      .send(newProperty)
      .expect(201);

    expect(response.body.title).toBe(newProperty.title);
  });

  it("should return 401 if no token is provided for POST", async () => {
    const newProperty = {
      title: "Unauthorized Property",
      type: "House",
      description: "This should fail",
      price: 100000,
      location: {
        address: "123 Fail St",
        city: "Boston",
        state: "MA",
        zipCode: "02101"
      },
      squareFeet: 1000,
      yearBuilt: 2020
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(401);
  });

  // ---------------- GET by ID ----------------
  it("should return one property by ID", async () => {
    const property = await Property.findOne();
    const response = await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(property.title);
  });

  it("should return 404 for non-existing property ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/properties/${nonExistentId}`)
      .expect(404);
  });

  // ---------------- PUT ----------------
  it("should update one property by ID", async () => {
    const property = await Property.findOne();
    const updatedProperty = { 
      description: "Updated property description.", 
      price: 400000 
    };

    const response = await api
      .put(`/api/properties/${property._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.description).toBe(updatedProperty.description);

    const updatedPropertyCheck = await Property.findById(property._id);
    expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
  });

  it("should return 401 if no token is provided for PUT", async () => {
    const property = await Property.findOne();
    const updatedProperty = {
      description: "Unauthorized update",
      price: 999999,
    };

    await api
      .put(`/api/properties/${property._id}`)
      .send(updatedProperty)
      .expect(401);
  });

  it("should return 404 for invalid property ID when PUT", async () => {
    const invalidId = "12345";
    await api
      .put(`/api/properties/${invalidId}`)
      .set("Authorization", "Bearer " + token)
      .send({})
      .expect(404);
  });

  // ---------------- DELETE ----------------
  it("should delete one property by ID", async () => {
    const property = await Property.findOne();
    await api
      .delete(`/api/properties/${property._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const propertyCheck = await Property.findById(property._id);
    expect(propertyCheck).toBeNull();
  });

  it("should return 401 if no token is provided for DELETE", async () => {
    const property = await Property.findOne();
    await api
      .delete(`/api/properties/${property._id}`)
      .expect(401);
  });

  it("should return 404 for invalid property ID when DELETE", async () => {
    const invalidId = "12345";
    await api
      .delete(`/api/properties/${invalidId}`)
      .set("Authorization", "Bearer " + token)
      .expect(404);
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});