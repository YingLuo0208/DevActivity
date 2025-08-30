// Footer.jsx

// 定义 Footer 组件，接收 props 作为参数
function Footer(props) {
  // 使用 <footer> 标签表示页脚，内容由 props.text 决定
  return <footer>{props.text}</footer>;
}

// 导出 Footer 组件，方便在其他文件中使用
export default Footer;
