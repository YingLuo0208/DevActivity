import { useEffect } from 'react';
import { useState } from 'react';

const UseEffectTest = () => {
  // 定义三个 state 状态
  const [toggleOne, setToggleOne] = useState(false); // 控制第一个按钮的布尔值
  const [toggleTwo, setToggleTwo] = useState(false); // 控制第二个按钮的布尔值
  const [count, setCount] = useState(0);             // 计数器，初始为 0

  // useEffect1：只在组件初次挂载时运行一次（因为依赖数组 [] 是空的）
  useEffect(() => {
    console.log('UseEffect1 Ran');
  }, []);

  // useEffect2：在 toggleTwo 改变时运行
  useEffect(() => {
    console.log('UseEffect2 Ran');
    if (toggleTwo) {
      console.log('toggleTwo slice of state is true so this code runs');
    }
  }, [toggleTwo]); // 依赖 toggleTwo，当 toggleTwo 改变时才会触发

  // useEffect3：和 count 相关联
  // 每次 count 改变时：
  //   - 先清理上一次的定时器（return 部分）
  //   - 再新建一个新的 setInterval，每隔 1 秒打印 count
  useEffect(() => {
    const myInterval = setInterval(() => {
      console.log(`UseEffect3 with interval number ${count} is running`);
    }, 1000);

    // cleanup 函数：组件卸载或 count 改变时运行
    return () => {
      console.log(
        `UseEffect3 cleanup ran.\nsetInterval number ${count} is being cleared out`
      );
      clearInterval(myInterval); // 清理掉上一次的定时器，避免内存泄漏
    };
  }, [count]); // 依赖 count

  return (
    <div>
      {console.log('rendered or re-rendered')}
      <h1>UseEffectTest Component</h1>

      {/* 点击按钮切换 toggleOne 的布尔值 */}
      <button onClick={() => setToggleOne(!toggleOne)}>ToggleOne</button>

      {/* 点击按钮切换 toggleTwo 的布尔值，触发 useEffect2 */}
      <button onClick={() => setToggleTwo(!toggleTwo)}>toggleTwo</button>

      {/* 点击按钮让 count +1，触发 useEffect3 */}
      <button onClick={() => setCount(count + 1)}>Count</button>
    </div>
  );
};

export default UseEffectTest;
