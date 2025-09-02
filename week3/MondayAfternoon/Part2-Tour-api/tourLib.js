// feedbackLib.js

// 存放反馈数据的数组
let tours = [];
// 自增 ID，从 1 开始
let currentId = 1;

// 获取所有反馈
const getAll = () => {
  return tours;
}

const addOne = (name, info, image, price) => {
  if (!name || !info || !image || price === undefined) {
    return false;
  }

  const newTour = {
    id: currentId++,
    name,
    info,
    image,
    price
  };

  tours.push(newTour);
  return newTour;
};

const findById = (id) => {
  const numericId = Number(id);
  const tour = tours.find(item => item.id === numericId);
  return tour || false;
};

const updateOneById = (id, updatedData) => {
  const tour = findById(id);
  if (tour) {
    if (updatedData.name) {
      tour.name = updatedData.name;
    }
    if (updatedData.info) { 
      tour.info = updatedData.info;
    }
    if (updatedData.image) { 
      tour.image = updatedData.image;
    }
    if (updatedData.price !== undefined) {
      tour.price = updatedData.price;
    }
    return tour;
  }
  return false;
};

const deleteOneById = (id) => {
  const tour = findById(id);
  if (tour) {
    const initialLength = tours.length;
    tours = tours.filter(item => item.id !== Number(id));
    return tours.length < initialLength;
  }
  return false;
};


// 导出模块
module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById
};



// 测试
if (require.main === module) {
  let result = addOne(
    "7 Days Tour",
    " Join us for the Best of Helsinki!",
    "https://www.course-api.com/images/tours/tour-x.jpeg", 
    "1,495"
);
  console.log("Add one tour:",result);
  
  result = addOne(
    "Best of Paris in 7 Days Tour",
    "Paris is synonymous with the finest things that culture can offer...",
    "https://www.course-api.com/images/tours/tour-1.jpeg", 
    "1,995"
);
  console.log("Add another tour:",result);

  console.log("getAll called:", getAll());

  console.log("findById called:", findById(1));

  console.log(
    "Update ID 1:", 
    updateOneById(1, {
         name: "Updated Tour Name",
         info: "Updated tour information...",
         image: "https://www.course-api.com/images/tours/tour-2.jpeg",
         price: "2,095" 
        })
    );
  console.log("Find by ID (1) again:", findById(1));

  console.log("Delete ID 1:", deleteOneById(1));
  
  console.log("Get all after delete:", getAll());
}