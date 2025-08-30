// Section.jsx

// 定义 Section 组件，接收 props 作为参数
function Section(props) {
  return (
    <section>
      {/* 使用 props.heading 显示标题 */}
      <h2>{props.heading}</h2>

      {/* 使用 props.content 显示内容 */}
      <p>{props.content}</p>
    </section>
  );
}

// 导出 Section 组件，方便在其他文件中使用
export default Section;
