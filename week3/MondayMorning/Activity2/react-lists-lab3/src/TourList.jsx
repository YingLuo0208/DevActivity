// src/TourList.jsx
import Tour from "./Tour"; // 导入 Tour 子组件

const TourList = (props) => {
  const { tours } = props; // 从 props 中解构出 tours 数组
  return (
    <section>
      {/* 标题部分 */}
      <div className="title">
        <h2>our tours</h2>       {/* 显示标题 */}
        <div className="underline"></div> {/* 标题下的装饰线 */}
      </div>

      {/* 旅游列表 */}
      <div>
        {tours.map((tour) => (       // 遍历 tours 数组
          <Tour 
            key={tour.id}             // React 渲染列表时需要唯一 key
            tour={tour}               // 将当前 tour 对象作为 props 传给子组件
          />
        ))}
      </div>
    </section>
  );
};

export default TourList; // 导出组件
