// Header.jsx

// 定义一个 Header 组件，接收 props 作为参数
function Header(props) {
  // 返回一个 <header> 元素，并显示 props.title 的内容
  return <header>{props.title}</header>;
}

// 导出 Header 组件，方便在其他文件中使用
export default Header;
