const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app); // 使用 supertest 来测试 Express app
const Workout = require("../models/workoutModel");

// 定义初始的两个测试用 workout 数据
const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

// 工具函数：从数据库获取所有 workouts，并转成 JSON
const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

// 在每个测试前先清空数据库，并插入 initialWorkouts
beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

describe("Workout API", function () {
  // ----------- 测试获取 workout -----------
  describe("When there are initial workouts saved", function () {
    it("should return all workouts", async function () {
      // 发起 GET 请求，返回所有 workouts
      const response = await api.get("/api/workouts");

      // 断言返回的数量等于 initialWorkouts 的数量
      expect(response.body).toHaveLength(initialWorkouts.length);
    });

    it("should contain a specific workout in the returned workouts", async function () {
      const response = await api.get("/api/workouts");

      // 把所有 title 提取出来
      const contents = response.body.map((r) => r.title);
      // 断言其中包含 "test workout 2"
      expect(contents).toContain("test workout 2");
    });

    it("should return workouts in JSON format", async function () {
      // 检查响应的状态码和 Content-Type
      await api
        .get("/api/workouts")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  // ----------- 测试添加 workout -----------
  describe("When adding a new workout", function () {
    it("should successfully add a new workout", async function () {
      const newWorkout = {
        title: "test workout x",
        reps: 19,
        load: 109,
      };

      // 发起 POST 请求，新增 workout
      await api.post("/api/workouts").send(newWorkout).expect(201);

      // 再次获取所有 workouts，验证数量增加了 1
      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length + 1);
    });

    it("should add a valid workout", async function () {
      const newWorkout = {
        title: "Situps",
        reps: 25,
        load: 10,
      };

      // 发起 POST 请求，验证成功返回 JSON
      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // 获取所有 workouts，验证数量 +1 且包含 "Situps"
      const response = await api.get("/api/workouts");
      const contents = response.body.map((r) => r.title);

      expect(response.body).toHaveLength(initialWorkouts.length + 1);
      expect(contents).toContain("Situps");
    });

    it("should not add a workout without a title", async function () {
      const newWorkout = {
        reps: 23, // 缺少 title
      };

      // 发起 POST 请求，应该返回 400 错误
      await api.post("/api/workouts").send(newWorkout).expect(400);

      // 再次获取，数量不变
      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });
  });

  // ----------- 测试删除 workout -----------
  describe("When deleting a workout", function () {
    it("should succeed with status code 204 if the id is valid", async function () {
      // 获取数据库当前的 workouts
      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];

      // 发起 DELETE 请求，删除第一个 workout
      await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

      // 获取删除后的数据，验证数量 -1
      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

      // 验证被删除的 title 不在返回的列表里
      const contents = workoutsAtEnd.map((r) => r.title);
      expect(contents).not.toContain(workoutToDelete.title);
    });
  });
});

// 测试全部完成后关闭 mongoose 连接
afterAll(() => {
  mongoose.connection.close();
});
