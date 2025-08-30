// Sidebar.jsx

// 定义 Sidebar 组件，接收 props 作为参数
function Sidebar(props) {
  // 使用 <aside> 标签表示侧边栏，内容由 props.content 决定
  return <aside>{props.content}</aside>;
}

// 导出 Sidebar 组件，方便在其他文件中使用
export default Sidebar;
