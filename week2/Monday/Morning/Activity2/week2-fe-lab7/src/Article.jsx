// Article.jsx

// 定义 Article 组件，接收 props 作为参数
function Article(props) {
  return (
    <article>
      {/* 使用 props.title 显示文章标题 */}
      <h3>{props.title}</h3>

      {/* 使用 props.text 显示文章内容 */}
      <p>{props.text}</p>
    </article>
  );
}

// 导出 Article 组件，方便在其他文件中使用
export default Article;
