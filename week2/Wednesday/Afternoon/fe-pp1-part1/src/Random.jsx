// Random.js

function Random({ min, max }) {
  // 生成 min 到 max 之间的随机整数
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <div className="random">
      Random value between {min} and {max} =&gt; {randomNumber}
    </div>
  );
}

export default Random;
