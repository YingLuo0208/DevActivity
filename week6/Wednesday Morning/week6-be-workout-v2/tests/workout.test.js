const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app); // 使用 supertest 来调用 Express app
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js"); // 引入测试用的 workouts 数据

let token = null; // 用来存储用户登录后的 token

describe("Workout API Tests", () => {
  // ------------------- 全局准备工作 -------------------
  beforeAll(async () => {
    // 清空用户表，确保每次测试都是干净的环境
    await User.deleteMany({});

    // 注册一个新用户，并获取 token
    const result = await api
      .post("/api/user/signup")
      .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });

    token = result.body.token; // 保存 token，后面接口请求都需要身份验证
  });

  // ------------------- 每个测试组前置操作 -------------------
  describe("Given initial workouts are saved", () => {
    let savedWorkoutId; // 存储已保存 workout 的 ID，用于后续 GET/PUT/DELETE 测试

    beforeEach(async () => {
      // 清空 workouts 集合
      await Workout.deleteMany({});

      // 依次向数据库插入 workouts[0] 和 workouts[1]
      const savedWorkout = await api
        .post("/api/workouts")
        .set("Authorization", `bearer ${token}`) // 携带 token 进行认证
        .send(workouts[0])
        .send(workouts[1]); // 注意这里连续 send，实际上只会保存最后一个 workouts[1]

      // 保存最后一个 workout 的 ID
      savedWorkoutId = savedWorkout.body._id;
    });

    // ------------------- GET /api/workouts -------------------
    describe("GET /api/workouts", () => {
      it("should return all workouts as JSON", async () => {
        await api
          .get("/api/workouts")
          .set("Authorization", `bearer ${token}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
    });

    // ------------------- POST /api/workouts -------------------
    describe("POST /api/workouts", () => {
      it("should successfully add a new workout", async () => {
        const newWorkout = {
          title: "testworkout",
          reps: 10,
          load: 100,
        };

        // 发起 POST 请求，新增 workout
        const response = await api
          .post("/api/workouts")
          .set("Authorization", `bearer ${token}`)
          .send(newWorkout)
          .expect(201);

        // 验证响应内容是否正确
        expect(response.body.title).toBe(newWorkout.title);
        expect(response.body.reps).toBe(newWorkout.reps);
        expect(response.body.load).toBe(newWorkout.load);
      });
    });

    // ------------------- DELETE /api/workouts/:id -------------------
    describe("DELETE /api/workouts/:id", () => {
      it("should delete a workout by ID", async () => {
        // 删除刚保存的 workout
        await api
          .delete(`/api/workouts/${savedWorkoutId}`)
          .set("Authorization", `bearer ${token}`)
          .expect(204);

        // 再次请求该 workout，应返回 404
        const response = await api
          .get(`/api/workouts/${savedWorkoutId}`)
          .set("Authorization", `bearer ${token}`)
          .expect(404);
      });
    });

    // ------------------- PUT/PATCH /api/workouts/:id -------------------
    describe("PUT /api/workouts/:id", () => {
      it("should update a workout by ID", async () => {
        const updatedWorkout = {
          title: "Updated workout",
          reps: 15,
          load: 150,
        };

        // 更新 workout
        const response = await api
          .patch(`/api/workouts/${savedWorkoutId}`)
          .set("Authorization", `bearer ${token}`)
          .send(updatedWorkout)
          .expect(200);

        // 再次请求该 workout，验证数据已更新
        const new_response = await api
          .get(`/api/workouts/${savedWorkoutId}`)
          .set("Authorization", `bearer ${token}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(new_response.body.title).toBe(updatedWorkout.title);
        expect(new_response.body.reps).toBe(updatedWorkout.reps);
        expect(new_response.body.load).toBe(updatedWorkout.load);
      });
    });

    // ------------------- GET /api/workouts/:id -------------------
    describe("GET /api/workouts/:id", () => {
      it("should return a single workout by ID", async () => {
        const response = await api
          .get(`/api/workouts/${savedWorkoutId}`)
          .set("Authorization", `bearer ${token}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        // 验证返回的内容和 workouts[1] 保持一致
        expect(response.body.title).toBe(workouts[1].title);
        expect(response.body.reps).toBe(workouts[1].reps);
        expect(response.body.load).toBe(workouts[1].load);
      });
    });

  });

  // ------------------- 关闭数据库连接 -------------------
  afterAll(() => {
    mongoose.connection.close();
  });
});
