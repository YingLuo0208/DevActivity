// src/App.jsx

// 导入子组件 TourList，用于渲染旅游列表
import TourList from "./TourList";

// 导入旅游数据 tours（数组），每个元素是一个旅游对象
import { tours } from "./toursData";

// 导入样式文件
import "./App.css";

// 顶层组件 App，整个应用的入口组件
function App() {
  return (
    <main>
      {/* 
        渲染 TourList 组件
        并将 tours 数组通过 props 传递给子组件
        子组件会遍历数组，渲染每个旅游项目
      */}
      <TourList tours={tours} />
    </main>
  );
}

// 导出 App 组件，使其可以在 index.jsx 中被渲染到页面
export default App;
