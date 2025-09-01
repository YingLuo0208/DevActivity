// src/Tour.jsx
const Tour = (props) => {
  // props.tour → 就是父组件传下来的对象,从 props.tour 中解构出需要的数据
  const { image, info, name, price } = props.tour;

  return (
    <article className="single-tour">
      {/* 旅游图片 */}
      <img src={image} alt={name} />

      <footer>
        {/* 名称和价格信息 */}
        <div className="tour-info">
          <h4>{name}</h4>                  {/* 旅游名称 */}
          <h4 className="tour-price">€{price}</h4> {/* 旅游价格 */}
        </div>

        {/* 简介部分 */}
        <p>
          {`${info.substring(0, 200)}...`}   {/* 只显示前200个字符，加省略号 */}
          <button>read more</button>       {/* 读更多按钮，一般用来展开全文 */}
        </p>

        {/* 删除按钮 */}
        <button className="delete-btn">not interested</button> {/* 点击可删除或隐藏当前旅游 */}
      </footer>
    </article>
  );
};

export default Tour; // 导出 Tour 组件
