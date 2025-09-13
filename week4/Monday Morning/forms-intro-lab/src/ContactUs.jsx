// src/ContactUs.jsx
import { useState } from 'react'; // 从 React 中引入 useState Hook，用于管理组件状态

// 定义 ContactUs 组件
function ContactUs() {
  // 创建各个表单字段的状态，初始值都为空字符串
  const [name, setName] = useState('');         // 姓名
  const [email, setEmail] = useState('');       // 邮箱
  const [phone, setPhone] = useState('');       // 电话号码
  const [phoneType, setPhoneType] = useState(''); // 电话类型（Home/Work/Mobile）
  const [comments, setComments] = useState(''); // 留言或备注

  // 表单提交事件处理函数
  const onSubmit = e => {
    e.preventDefault(); // 阻止表单默认提交行为，防止页面刷新

    // 创建一个对象，存储当前表单信息
    const contactUsInformation = {
      name,
      email,
      phone,
      phoneType,
      comments,
      submittedOn: new Date() // 记录提交时间
    };

    console.log(contactUsI7nformation); // 在控制台打印表单信息，便于调试

    // 重置表单字段状态为空
    setName('');
    setEmail('');
    setPhone('');
    setPhoneType('');
    setComments('');
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        {/* 姓名输入框 */}
        <div>
          <label htmlFor='name'>Name:</label>
          <input 
            id='name' 
            type='text' 
            onChange={e => setName(e.target.value)} // 每次输入更新 name 状态
            value={name} // 受控组件，绑定 name 状态
          />
        </div>

        {/* 邮箱输入框 */}
        <div>
          <label htmlFor='email'>Email:</label>
          <input 
            id='email' 
            type='text'
            onChange={e => setEmail(e.target.value)} // 更新 email 状态
            value={email} // 受控组件
          />
        </div>

        {/* 电话输入框和类型选择 */}
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            id='phone'
            type='text'
            onChange={e => setPhone(e.target.value)} // 更新 phone 状态
            value={phone} // 受控组件
          />
          <select
             name='phoneType'
             onChange={e => setPhoneType(e.target.value)} // 更新 phoneType 状态
             value={phoneType} // 受控组件
          >
             <option value='' disabled>
               Select a phone type...
             </option>
             <option>Home</option>
             <option>Work</option>
             <option>Mobile</option>
          </select> 
        </div>

        {/* 留言文本框 */}
        <div>
          <label htmlFor='comments'>Comments:</label>
          <textarea
            id='comments' 
            type='comments' 
            onChange={e => setComments(e.target.value)} // 更新 comments 状态
            value={comments} // 受控组件
          />
        </div>

        {/* 提交按钮 */}
        <button>Submit</button>
      </form>
    </div>
  );
}

// 导出组件
export default ContactUs;
