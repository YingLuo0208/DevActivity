import { useState } from 'react';  // 从 React 中引入 useState Hook，用于创建组件状态
import './UseState.css';           // 引入对应的 CSS 文件，用于主题样式

// 定义 Counter 组件
const Counter = () => {
  // 创建主题状态，初始值为 'light'
  const [theme, setTheme] = useState('light');

  // 创建计数器状态，初始值为 0
  const [count, setCount] = useState(0);

  // 定义切换主题函数
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // 外层 div 的 className 动态绑定主题，state + theme
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>

      {/* 点击按钮将主题切换为 dark */}
      <button onClick={() => setTheme('dark')}>
        Dark
      </button>

      {/* 点击按钮将主题切换为 light */}
      <button onClick={() => setTheme('light')}>
        Light
      </button>

      {/* 点击按钮调用 toggleTheme 切换主题 */}
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>

      {/* 显示计数器的值 */}
      <h2>{ count }</h2>

      {/* 点击按钮将计数器加 1，使用回调确保基于上一次状态 */}
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Increment
      </button>

      {/* 点击按钮将计数器减 1 */}
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        Decrement
      </button>
    </div>
  );
};

// 导出组件
export default Counter;
