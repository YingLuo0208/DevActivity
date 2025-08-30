// 定义一个 Greeting 组件，接收 props 作为参数
function Greeting(props) {
    console.log(props); // 在控制台打印 props 对象，方便调试查看传入的属性值
    
    return (
        // 返回 JSX 结构
        <div className="greeting"> {/* 外层 div，类名为 greeting */}
            <h1>Welcome, {props.name}!</h1> {/* 使用 props.name 显示欢迎语 */}
            <p>{props.message}</p> {/* 使用 props.message 显示附加信息 */}
        </div>
    );
}

// 导出 Greeting 组件，以便在其他文件中使用
export default Greeting;
