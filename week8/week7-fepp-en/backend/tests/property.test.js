const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

// Mock user for testing
const mockUser = {
  name: "Test User",
  username: "testuser",
  password: "Test123!",
  phone_number: "123-456-7890",
  gender: "male",
  date_of_birth: new Date("1990-01-01"),
  role: "user",
  address: {
    street: "123 Test St",
    city: "Test City",
    state: "TS",
    zipCode: "12345"
  }
};

let authToken = "";
let mockUserId = "";

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
    user_id: null // Will be set in beforeEach
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
    user_id: null // Will be set in beforeEach
  },
];

describe("Property Controller", () => {
  beforeAll(async () => {
    // Create a test user and get auth token
    await User.deleteMany({});
    const signupResponse = await api
      .post("/api/users/signup")
      .send(mockUser);
    
    authToken = signupResponse.body.token;
    
    // Get user info using the token
    const userResponse = await api
      .get("/api/users/me")
      .set("Authorization", `Bearer ${authToken}`);
      
    mockUserId = userResponse.body._id;
  });

  beforeEach(async () => {
    await Property.deleteMany({});
    // Set user_id for all properties
    const propertiesWithUserId = properties.map(property => ({
      ...property,
      user_id: mockUserId
    }));
    await Property.insertMany(propertiesWithUserId);
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
      yearBuilt: 2018
    };

    await api
      .post("/api/properties")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyTitles = propertiesAfterPost.map((property) => property.title);
    expect(propertyTitles).toContain(newProperty.title);
  });

  // Test POST /api/properties without auth token
  it("should return 401 when POST /api/properties is called without auth token", async () => {
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
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedPropertyCheck = await Property.findById(property._id);
    expect(updatedPropertyCheck.description).toBe(updatedProperty.description);
    expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
  });

  it("should return 401 when PUT /api/properties/:id is called without auth token", async () => {
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

  it("should return 404 for invalid property ID when PUT /api/properties/:id", async () => {
    const invalidId = "12345";
    await api
      .put(`/api/properties/${invalidId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({})
      .expect(404);
  });

  // Test DELETE /api/properties/:id
  it("should delete one property by ID when DELETE /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api
      .delete(`/api/properties/${property._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(204);

    const deletedPropertyCheck = await Property.findById(property._id);
    expect(deletedPropertyCheck).toBeNull();
  });

  it("should return 401 when DELETE /api/properties/:id is called without auth token", async () => {
    const property = await Property.findOne();
    await api
      .delete(`/api/properties/${property._id}`)
      .expect(401);
  });

  it("should return 404 for invalid property ID when DELETE /api/properties/:id", async () => {
    const invalidId = "12345";
    await api
      .delete(`/api/properties/${invalidId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(404);
  });
});