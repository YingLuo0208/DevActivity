import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // 这里传 email & password
    });

    if (response.ok) {
      const user = await response.json();
      // 把返回的用户信息 / token 存到 sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("User logged in successfully!");
      setIsAuthenticated(true);// 更新父组件状态
      navigate("/");// 登录成功跳转首页
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData?.error || "Unknown error");
      alert("Login failed: " + (errorData?.error || "Please check credentials"));
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong. Please try again.");
  }
};

    const handleLogout = () => {
      sessionStorage.removeItem("user");        // 清空 sessionStorage
      setIsAuthenticated(false);              // 更新状态
      navigate("/login");                      // 可选：跳回登录页
      console.log("User logged out, localStorage cleared!");
    };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
        Log Out
      </button>    
    </div>
  );
};

export default LoginComponent;
