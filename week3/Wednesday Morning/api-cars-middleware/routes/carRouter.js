const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carControllers');

const {
  middleware3,
  middleware4,
  middleware5,
  middlewareNoNext,
} = require('../middleware/customMiddlewares');

// 在这个路由上使用 middleware3，对所有 /cars 请求生效
router.use(middleware3);

// GET /cars
// 获取所有汽车信息
router.get('/', getAllCars);

// 在 /cars 路由之后使用 middleware4
router.use(middleware4);

// POST /cars
// 创建一辆新车
router.post('/', createCar);

// GET /cars/:carId
// 获取指定 ID 的汽车信息，middleware5 只在这个路由触发
router.get('/:carId', middleware5, getCarById);

// PUT /cars/:carId
// 更新指定 ID 的汽车信息
router.put('/:carId', updateCar);

// 在 /cars/:carId 路由之后使用 middlewareNoNext
router.use(middlewareNoNext);

// DELETE /cars/:carId
// 删除指定 ID 的汽车信息
router.delete('/:carId', deleteCar);

// 导出路由
module.exports = router;

