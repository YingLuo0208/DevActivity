import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignupComponent from "./pages/SignupComponent";
import LoginComponent from "./pages/LoginComponent";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );
  return (
    <>
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="pages">
          <Routes>
            {/* 首页：已登录显示 Home，未登录显示 Login */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <LoginComponent setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* 登录页：未登录显示 Login，已登录跳转首页 */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginComponent setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* 注册页：未登录显示 Signup，已登录跳转首页 */}
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <SignupComponent setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
