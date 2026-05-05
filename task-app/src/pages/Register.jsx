import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api/request";

function Register() {
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

  const handleRegister = async () => {
    try {
      await request.post("/register", form);

      alert("注册成功");

      // 注册成功跳去登录
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("注册失败");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          注册
        </button>

        <p style={styles.linkText}>
          已有账号？ <a href="/login">去登录</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  linkText: {
    marginTop: "10px",
    textAlign: "center",
  },
};

export default Register;