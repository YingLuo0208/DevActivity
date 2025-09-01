// feedbackLib.js
let feedback = [];
let currentId = 1;


function getALL(){
    return feedbacks;
}
 
function addOne(name, message, rating){
    const newFeedback = {
        id : currentId++,
        name,
        message,
        rating
    };
feedback.push(newFeedback)
return newFeedback;
}


function findById(id){
    return feedback.find(fb => fb.id === id );
}

function updateOne(id, data){
    const feedback = findById(id);
    if (feedback){
        Object.assign(feedback, data);
        return feedback;
    }
    return null;
}




if (require.main === module) {
  let result = addOne({
    name: "John Smith",
    message: "Great session on React components! I found the examples very helpful.",
    rating: 4
  });
  console.log(result);
  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));
  // rest of the tests here
}
