const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("✅ should signup a new user with valid credentials", async () => {
      const userData = {
        name: "Test User",
        username: "testuser",
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
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
      expect(result.body).toHaveProperty("username", userData.username);

      // Extra check: user is actually saved in DB
      const savedUser = await User.findOne({ username: userData.username });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(userData.name);
    });

    it("❌ should return an error with missing required fields", async () => {
      const userData = {
        username: "incomplete",
        password: "Test123!",
        // Missing required fields: name, phone_number, gender, date_of_birth, address
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("❌ should return an error with duplicate username", async () => {
      const userData = {
        name: "First User",
        username: "duplicate",
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
      };

      // First signup
      await api.post("/api/users/signup").send(userData);

      // Try to signup with same username
      const duplicateUserData = {
        ...userData,
        name: "Second User"
      };

      const result = await api.post("/api/users/signup").send(duplicateUserData);

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("❌ should return an error with invalid address format", async () => {
      const userData = {
        name: "Test User",
        username: "invalidaddress",
        password: "Test123!",
        phone_number: "123-456-7890",
        gender: "male",
        date_of_birth: "1990-01-01",
        role: "user",
        address: "invalid address format" // should be object, not string
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("✅ should login a user with valid credentials", async () => {
      const userData = {
        name: "Login User",
        username: "loginuser",
        password: "Login123!",
        phone_number: "123-456-7890",
        gender: "female",
        date_of_birth: "1992-05-15",
        role: "user",
        address: {
          street: "456 Login Ave",
          city: "Login City",
          state: "LC",
          zipCode: "54321"
        }
      };

      // First signup
      await api.post("/api/users/signup").send(userData);

      // Then login
      const result = await api.post("/api/users/login").send({
        username: userData.username,
        password: userData.password,
      });

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
      expect(result.body).toHaveProperty("username", userData.username);
    });

    it("❌ should return an error with non-existent username", async () => {
      const result = await api.post("/api/users/login").send({
        username: "nonexistent",
        password: "Test123!",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("❌ should return an error with wrong password", async () => {
      const userData = {
        name: "Password Test User",
        username: "passwordtest",
        password: "Correct123!",
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
      };

      // First signup
      await api.post("/api/users/signup").send(userData);

      // Try login with wrong password
      const result = await api.post("/api/users/login").send({
        username: userData.username,
        password: "WrongPassword123!",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("❌ should return an error with missing credentials", async () => {
      const result = await api.post("/api/users/login").send({
        username: "testuser",
        // Missing password
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("GET /api/users/me", () => {
    it("✅ should return user profile with valid token", async () => {
      const userData = {
        name: "Profile User",
        username: "profileuser",
        password: "Profile123!",
        phone_number: "123-456-7890",
        gender: "female",
        date_of_birth: "1988-12-25",
        role: "user",
        address: {
          street: "789 Profile Rd",
          city: "Profile City",
          state: "PC",
          zipCode: "11111"
        }
      };

      // Signup and get token
      const signupResult = await api.post("/api/users/signup").send(userData);
      const token = signupResult.body.token;

      // Get user profile
      const result = await api
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("name", userData.name);
      expect(result.body).toHaveProperty("username", userData.username);
      expect(result.body).toHaveProperty("gender", userData.gender);
      expect(result.body).not.toHaveProperty("password"); // Password should not be returned
    });

    it("❌ should return 401 without token", async () => {
      const result = await api.get("/api/users/me");

      expect(result.status).toBe(401);
    });

    it("❌ should return 401 with invalid token", async () => {
      const result = await api
        .get("/api/users/me")
        .set("Authorization", "Bearer invalidtoken");

      expect(result.status).toBe(401);
    });
  });
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});