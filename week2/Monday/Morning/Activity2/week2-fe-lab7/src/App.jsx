// App.jsx
import React from 'react';         // 引入 React
import Header from './Header';     // 引入 Header 组件
import Section from './Section';   // 引入 Section 组件
import Article from './Article';   // 引入 Article 组件
import Sidebar from './Sidebar';   // 引入 Sidebar 组件
import Footer from './Footer';     // 引入 Footer 组件
import './App.css';                // 引入样式文件

// 定义一些变量作为动态内容（props 会用到）
const appTitle = 'JSX and Props Showcase';       // 应用标题
const section1Content = 'This is the content of section 1.';  // 第一个 Section 的内容
const article1Title = 'Article 1';              // 第一个 Article 的标题
const article1Text = 'Content of Article 1.';   // 第一个 Article 的内容
const sidebarContent = 'Sidebar content goes here.'; // Sidebar 的内容
const section2Content = 'This is the content of section 2.';  // 第二个 Section 的内容
const footerText = 'Copyright © 2025 JSX Props App'; // Footer 的文字

// 定义 App 组件
function App() {
  return (
    <div>
      {/* 顶部标题，传入 appTitle */}
      <Header title={appTitle} />

      {/* 第一个 Section，传入 heading 和 content */}
      <Section heading="Section 1" content={section1Content} />

      {/* 一篇文章，传入 title 和 text */}
      <Article title={article1Title} text={article1Text} />

      {/* 侧边栏，传入 content */}
      <Sidebar content={sidebarContent} />

      {/* 第二个 Section，传入 heading 和 content */}
      <Section heading="Section 2" content={section2Content} />

      {/* 底部，传入 footerText */}
      <Footer text={footerText} />
    </div>
  );
}

// 导出 App 组件
export default App;
