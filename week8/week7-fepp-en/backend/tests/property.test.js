const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");

// Mock user ID for testing
const mockUserId = new mongoose.Types.ObjectId();

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
    yearBuilt: 2020,
    user_id: mockUserId
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
    yearBuilt: 2015,
    user_id: mockUserId
  },
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/properties
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // Test POST /api/properties
  it("should create a new property when POST /api/properties is called", async () => {
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
      yearBuilt: 2018,
      user_id: mockUserId
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyTitles = propertiesAfterPost.map((property) => property.title);
    expect(propertyTitles).toContain(newProperty.title);
  });

  // Test GET /api/properties/:id
  it("should return one property by ID when GET /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing property ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/properties/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/properties/:id
  it("should update one property with partial data when PUT /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    const updatedProperty = {
      description: "Updated description",
      price: 400000,
    };

    await api
      .put(`/api/properties/${property._id}`)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedPropertyCheck = await Property.findById(property._id);
    expect(updatedPropertyCheck.description).toBe(updatedProperty.description);
    expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
  });

  it("should return 400 for invalid property ID when PUT /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/properties/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/properties/:id
  it("should delete one property by ID when DELETE /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api.delete(`/api/properties/${property._id}`).expect(204);

    const deletedPropertyCheck = await Property.findById(property._id);
    expect(deletedPropertyCheck).toBeNull();
  });

  it("should return 400 for invalid property ID when DELETE /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/properties/${invalidId}`).expect(400);
  });
});