import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api/request"  //从import axios from "axios" 改成这个，是为了统一请求入口，避免每个页面重复写逻辑

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
        //向后端发送登录请求
        //把axios.post()改掉用request.post()原因:
        // 1.baseURL已经在request.js配置好了
        // 2.避免写死地址（方便上写/部署）且更简洁
      const res = await request.post("/login", form);

      //console.log和localStorage都改成res是因为在request.js里面写了return response.data
      console.log("登录成功:", res);

      // 保存登陆状态 token（非常重要）
      localStorage.setItem("token", res.token);

      // 页面跳转
      navigate("/dashboard");
    } catch (err) {
      console.log("登录失败: ", err.response?.data);

      alert(err.response?.data?.msg || "登录失败");
    }
  };

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5"
    }}>
        <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "300px"
        }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
            onClick={handleLogin}
            style={{
            width: "100%",
            padding: "10px",
            background: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
            }}
        >
            登录
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
            没有账号？ <a href="/register">去注册</a>
        </p>
        </div>
    </div>
  );
}

export default Login;